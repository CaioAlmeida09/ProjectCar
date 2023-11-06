import { ChangeEvent, useContext, useState } from "react";
import { Container } from "../../../components/container";
import { Input } from "../../../components/input";
import { PlaceHeader } from "../../../components/placeHeader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../contexts/context";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../services/firebaseconection";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const schema = z.object({
  name: z.string().nonempty("o nome é obrigatório"),
  model: z.string().nonempty(" O modelo é obrigatório"),
  year: z.string().nonempty(" O ano é obrigatório"),
  KM: z.string().nonempty(" O KM é obrigatório"),
  price: z.string().nonempty(" O Valor é obrigatório"),
  city: z.string().nonempty(" A Cidade é obrigatório"),
  whatsapp: z
    .string()
    .min(1, "o telefone é obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value)),
  description: z.string().nonempty("A descrição é brigatória"),
});

type FormData = z.infer<typeof schema>;

interface ImageCarProps {
  uid: string;
  name: string;
  url: string;
  previewUrl: string;
}
export function New() {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function OnSubmit(data: FormData) {
    console.log(data);
    alert("Carro cadastrado com sucesso");
    reset();
  }

  async function HandleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === "image/jpeg" || image.type === "image/png") {
        await HandleUpload(image);
        console.log("deu certo");
      } else {
        alert("Imagem invalida. Coloque uma imagem png u jpeg");
        return;
      }
    }
  }

  const navigate = useNavigate();
  function HandleUpload(image: File) {
    if (!user?.uid) {
      return navigate("/login");
    }
    const currentUid = user?.uid;
    const uidImage = uuidv4();
    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);
    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downLoadUrl) => {
        console.log("Url da imagem", downLoadUrl);
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downLoadUrl,
        };
        setImageCar((images) => [...images, imageItem]);
      });
    });
  }

  const [imageCar, setImageCar] = useState<ImageCarProps[]>([]);
  return (
    <Container>
      <PlaceHeader />
      <main>
        <section className="mt-3 w-full h-32 bg-white flex items-center justify-start sm:flex-row flex-col">
          <button className=" flex justify-center items-center h-32 w-40 border-zinc-950 border-2 ">
            <div className="absolute cursor-pointer ">
              {" "}
              <FiUpload size={30} />
            </div>
            <div className="opacity-0 ">
              {" "}
              <input
                className="cursor-pointer"
                type="file"
                accept="image"
                onChange={HandleImage}
              />{" "}
            </div>
          </button>
        </section>
        <form
          className="w-full h-screen flex flex-col gap-5"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <div className="mt-5">
            <label className="mb-2 font-medium"> Nome do Carro</label>
            <Input
              register={register}
              type="text"
              name="name"
              placeholder="Ex: Onix..."
              error={errors.name?.message}
            />
          </div>
          <div>
            <label className="mb-2 font-medium"> Modelo do Carro</label>
            <Input
              register={register}
              type="text"
              name="model"
              placeholder="Ex: 1.0 flex full manual..."
              error={errors.model?.message}
            />
          </div>
          <section className="mt-3 w-full bg-white flex items-center justify-center sm:flex-row flex-col p-3 gap-6">
            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium"> Ano</label>
              <Input
                register={register}
                type="text"
                name="year"
                placeholder="2016..."
                error={errors.year?.message}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium"> KM</label>
              <Input
                register={register}
                type="text"
                name="KM"
                placeholder="Ex: 13000 km rodados..."
                error={errors.KM?.message}
              />
            </div>
          </section>
          <section className="mt-3 w-full bg-white flex items-center justify-center sm:flex-row flex-col p-3 gap-6">
            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium"> Cidade</label>
              <Input
                register={register}
                type="text"
                name="city"
                placeholder="Ex: Recife"
                error={errors.city?.message}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium"> Whatsapp</label>
              <Input
                register={register}
                type="text"
                name="whatsapp"
                placeholder="Ex: (xx) 00000-0000"
                error={errors.whatsapp?.message}
              />
            </div>
          </section>
          <div>
            <label className="mb-2 font-medium"> Preço</label>
            <Input
              register={register}
              type="text"
              name="price"
              placeholder="Ex: R$ 250.000"
              error={errors.price?.message}
            />
          </div>
          <div>
            <p className="mb-2 font-medium"> Descrição</p>
            <textarea
              className="border-2 rounded-md h-24 px-2 w-full"
              {...register("description")}
              id="description"
              name="description"
              placeholder="Digite a descrição completa"
            />
            {errors.description && (
              <p className="mb-1 text-red-500"> {errors.description.message}</p>
            )}
          </div>
          <button
            className="bg-black text-white text-medium rounded-md h-12 cursor-pointer hover:opacity-90"
            type="submit"
          >
            {" "}
            Cadastrar{" "}
          </button>
        </form>
      </main>
    </Container>
  );
}
