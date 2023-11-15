import { Container } from "../../components/container";
import { useState, useEffect } from "react";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseconection";
import { ImageCarProps } from "../../pages/dashboard/new/index";
import { Link } from "react-router-dom";

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
export function Home() {
  const [cars, setCars] = useState<carProps[]>([]);
  const [loadimg, setLoadImg] = useState<string[]>([]);

  useEffect(() => {
    function LoadCars() {
      const carsRef = collection(db, "Cars");
      const queryCars = query(carsRef, orderBy("created", "desc"));
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
  }, []);

  function handleImage(id: string) {
    setLoadImg((prevImageLoad) => [...prevImageLoad, id]);
  }
  return (
    <Container>
      <form className="flex justify-center md:gap-12 gap-4 mt-5">
        <input
          placeholder="Digite o nome do seu carro..."
          className="h-10 md:w-2/4 w-2/3 px-2 border-2"
        />
        <button
          type="submit"
          className="px-7 h-9 bg-red-600 text-white rounded-md"
        >
          Buscar
        </button>
      </form>
      <h1 className="font-bold text-center mt-10 mb-8">
        {" "}
        Carros Novos e Usados em Todo o Brasil
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link to={`/car/${car.id}`}>
            <section
              key={car.id}
              className=" flex flex-col px-3 py-2 items-center w-full bg-white"
            >
              <div
                className="w-full h-72 rounded-lg bg-slate-200"
                style={{ display: loadimg.includes(car.id) ? "none" : "block" }}
              ></div>
              <img
                src={car.images[0].url}
                className="w-full max-h-72 hover:scale-105 transition-all"
                style={{ display: loadimg.includes(car.id) ? "block" : "none" }}
                onLoad={() => handleImage(car.id)}
              />
              <h2 className="text-black font-bold text-lg mt-6">{car.name}</h2>
              <div className="mt-3 flex flex-col gap-8 mb-3 items-center">
                <p>
                  {" "}
                  {car.year} | {car.km}
                </p>
                <strong className="font-medium text-zinc-700 text-lg">
                  {car.price}
                </strong>
              </div>
              <div className="w-full h-px bg-slate-400"> </div>
              <p className=" text-zinc-700 text-xs mt-3"> {car.city} </p>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}
