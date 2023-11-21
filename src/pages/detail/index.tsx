import { useState, useEffect } from "react";
import { Container } from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ImageCarProps } from "../../pages/dashboard/new/index";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseconection";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

interface carProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  uid: string;
  km: string;
  created: string;
  whatsapp: string;
  images: ImageCarProps[];
  model: string;
  description: string;
}
export function Detail() {
  const [car, setCar] = useState<carProps>();
  const { id } = useParams();
  const [sliderPreview, setSilderPreview] = useState<number>(2);
  const navigate = useNavigate();
  useEffect(() => {
    async function LoadCar() {
      if (!id) {
        return;
      }
      const docRef = doc(db, "Cars", id);
      getDoc(docRef).then((snapshot) => {
        if (!snapshot.data()) {
          navigate("/");
        }
        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          price: snapshot.data()?.price,
          city: snapshot.data()?.city,
          uid: snapshot.data()?.uid,
          km: snapshot.data()?.km,
          created: snapshot.data()?.created,
          model: snapshot.data()?.model,
          description: snapshot.data()?.description,
          images: snapshot.data()?.images,
          whatsapp: snapshot.data()?.whatsapp,
        });
      });
    }

    LoadCar();
  }, [id]);

  useEffect(() => {
    function HandleSize() {
      if (window.innerWidth < 720) {
        setSilderPreview(1);
      } else {
        setSilderPreview(2);
      }
    }
    HandleSize();
    window.addEventListener("resize", HandleSize);

    return () => {
      window.removeEventListener("resize", HandleSize);
    };
  });

  return (
    <Container>
      {car && (
        <Swiper
          slidesPerView={sliderPreview}
          pagination={{ clickable: true }}
          navigation
        >
          {car?.images.map((image) => (
            <SwiperSlide key={image.name}>
              <img src={image.url} className="w-full h-96 object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4 ">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between ">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black"> R${car?.price}</h1>
          </div>
          <p> {car?.model}</p>
          <div className="flex flex-col">
            <div className="flex w-full gap-6 my-4">
              <div>
                <p>Cidade:</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Year:</p>
                <strong>{car?.year}</strong>
              </div>
            </div>
            <div className="flex w-full gap-6 my-4">
              <div>
                <p>KM Rodados:</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>
          <strong> Descrição</strong>
          <p className="mb-4">{car.description}</p>

          <strong> Telefone | Whatsapp</strong>
          <p className="mb-4"> {car?.whatsapp}</p>
          <a
            href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá vi esse ${car?.name} e fiquei interessado`}
            target="_blank"
            className="bg-green-500 w-full flex items-center justify-center px-2 text-white gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"
          >
            Conversar com o vendedor
            <button>
              {" "}
              <FaWhatsapp size={25} color="green" />{" "}
            </button>
          </a>
        </main>
      )}
    </Container>
  );
}
