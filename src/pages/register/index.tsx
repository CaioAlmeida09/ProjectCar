/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Link, useNavigate } from "react-router-dom";
import { InputRegister } from "../../components/input/inputRegister";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseconection";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/context";

const schema = z.object({
  name: z.string().nonempty("Esse campo é obrigatório"),
  email: z
    .string()
    .email("Digite um e-mail válido")
    .nonempty("Esse campo é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("Esse Campo é obrigatório"),
});

type FormData = z.infer<typeof schema>;
export function Register() {
  const navigate = useNavigate();
  const { HandleUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function Onsubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });
        HandleUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid,
        });
        toast.success("Bem vindo ao Project Cars");
        console.log("Cadastrado com Sucesso");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log("Erro no cadastro do Usuário");
        console.log(error);
        toast.error("erro ao cadastrar");
      });
  }
  useEffect(() => {
    async function HandleLogout() {
      await signOut(auth);
    }
    HandleLogout();
  }, []);
  return (
    <Container>
      <section className="flex flex-col w-full h-screen justify-start mt-16 items-center ">
        <form
          className="flex flex-col w-3/4 max-w-2xl md:px-6 md:py-4 px-2 py-4 gap-7 bg-white drop-shadow items-center"
          onSubmit={handleSubmit(Onsubmit)}
        >
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <InputRegister
            placeholder="Digite seu nome Completo"
            type="name"
            name="name"
            error={errors.name?.message}
            register={register}
          />
          <InputRegister
            name="email"
            placeholder="Digite um e-mail para cadastro"
            type="e-mail"
            error={errors.email?.message}
            register={register}
          />
          <InputRegister
            placeholder="Digite uma senha"
            type="password"
            name="password"
            error={errors.password?.message}
            register={register}
          />

          <button
            className="bg-black w-full h-9 rounded-lg text-white font-medium"
            type="submit"
          >
            Cadastrar
          </button>
          <Link to="/login">
            <p className="text-zinx-900 text-xs font-medium hover:font-bold">
              Já possui uma conta? Faça Login
            </p>
          </Link>
        </form>
      </section>
    </Container>
  );
}
