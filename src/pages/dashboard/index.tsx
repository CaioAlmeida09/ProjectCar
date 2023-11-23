import { Container } from "../../components/container";
import { PlaceHeader } from "../../components/placeHeader";
import { FiTrash2 } from "react-icons/fi";
import { ref, deleteObject } from "firebase/storage";
import {
  getDocs,
  query,
  collection,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebaseconection";
import { useState, useEffect, useContext } from "react";
import { ImageCarProps } from "../../pages/dashboard/new/index";
import { AuthContext } from "../../contexts/context";

interface carProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  uid: string;
  km: string;
  images: ImageCarProps[];
}

export function Dashboard() {
  const [cars, setCars] = useState<carProps[]>([]);
  const { user } = useContext(AuthContext);
  const [loadImg, setLoadImg] = useState<string[]>([]);

  useEffect(() => {
    function LoadCars() {
      if (!user?.uid) {
        return;
      }
      const carsRef = collection(db, "Cars");
      const queryCars = query(carsRef, where("uid", "==", user.uid));
      getDocs(queryCars)
        .then((snapshot) => {
          const listCars = [] as carProps[];
          snapshot.forEach((doc) => {
            listCars.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              km: doc.data().km,
              city: doc.data().city,
              price: doc.data().price,
              images: doc.data().images,
              uid: doc.data().uid,
            });
          });
          setCars(listCars);
        })
        .catch((err) => {
          console.log(err);
          console.log("erro ao buscar");
        });
    }
    LoadCars();
  }, [user]);
  async function HandleDelete(car: carProps) {
    const docRef = doc(db, "Cars", car.id);
    await deleteDoc(docRef);

    car.images.map(async (image) => {
      const imagePath = `images/${image.uid}/ ${image.name}`;
      const imageRef = ref(storage, imagePath);
      try {
        await deleteObject(imageRef);
      } catch (err) {
        console.log("erro ao deletar");
        console.log(err);
      }
    });
    setCars(cars.filter((cars) => cars.id !== car.id));
  }
  function handleImg(id: string) {
    setLoadImg((prevImageLoad) => [...prevImageLoad, id]);
  }

  return (
    <Container>
      <PlaceHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
            <button
              className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
              onClick={() => HandleDelete(car)}
            >
              <FiTrash2 size={26} color="#000" />
            </button>
            <div
              className=" w-full max-h-70 bg-slate-300 rounded-lg"
              style={{ display: loadImg.includes(car.id) ? "none" : "block" }}
            ></div>
            <img
              className="w-fuul rounded-lg mg-2 max-h-70 "
              src={car.images[0].url}
              style={{ display: loadImg.includes(car.id) ? "block" : "none" }}
              onLoad={() => handleImg(car.id)}
            />
            <p className="font-bold mt-1 px-2 mb-2"> {car.name}</p>
            <div className=" flex flex-col px-2 ">
              <span className="text-zinc-700">
                {car.year} | {car.km}km
              </span>
              <strong className="text-black font-bold mt-4">
                R$ {car.price}
              </strong>
            </div>
            <div className="w-full h-px bg-slate-200 my-2"></div>
            <div>
              <span className="px-2 pb-2"> {car.city}</span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
