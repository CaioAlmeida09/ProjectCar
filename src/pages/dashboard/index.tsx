import { Container } from "../../components/container";
import { PlaceHeader } from "../../components/placeHeader";
import { FiTrash2 } from "react-icons/fi";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../services/firebaseconection";
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
          console.log(listCars);
        })
        .catch((err) => {
          console.log(err);
          console.log("erro ao buscar");
        });
    }
    LoadCars();
  }, [user]);
  function HandleDelete() {
    console.log("deletando");
  }

  return (
    <Container>
      <PlaceHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg relative">
          <button
            className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
            onClick={() => HandleDelete()}
          >
            <FiTrash2 size={26} color="#000" />
          </button>
          <img
            className="w-fuul rounded-lg mg-2 max-h-70 "
            src="https://firebasestorage.googleapis.com/v0/b/webcarros-d2b8b.appspot.com/o/images%2FGmpnAN3WdogCNnhOrIBA6VX0kNi2%2F618c6e52-6bd5-4638-bd06-39480d3c5a45?alt=media&token=c9010910-c35c-4fcc-a85f-8330ec8025cd"
          />
          <p className="font-bold mt-1 px-2 mb-2"> Nissan Versan</p>
          <div className=" flex flex-col px-2 ">
            <span className="text-zinc-700">ANO 2026 | 232332 KM</span>
            <strong className="text-black font-bold mt-4"> R$ 150.000</strong>
          </div>
          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div>
            <span className="px-2 pb-2"> Campo Grande MS</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
