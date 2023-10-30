import { Container } from "../../components/container";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseconection";

const schema = z.object({
  email: z
    .string()
    .email("Insira um e-mail válido...")
    .nonempty("O Campo e-mail é obrigatório"),
  password: z.string().nonempty("O Preenchimento da senha é obrigatório"),
});

export type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    async function HandleLogout() {
      await signOut(auth);
    }
    HandleLogout();
  }, []);

  function OnSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("Logado com Sucesso");
        console.log(user);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log("Erro ao logar");
        console.log(error);
      });
  }

  return (
    <Container>
      <section className="flex flex-col w-full h-screen justify-start mt-16 items-center ">
        <form
          className="flex flex-col w-3/4 max-w-2xl md:px-6 md:py-4 px-2 py-4 gap-7 bg-white drop-shadow items-center"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Input
            placeholder="Digite seu e-mail..."
            name="email"
            type="email"
            error={errors.email?.message}
            register={register}
          />
          <Input
            placeholder="******"
            name="password"
            type="password"
            error={errors.password?.message}
            register={register}
          />
          <button
            className="bg-black w-full h-9 rounded-lg text-white font-medium"
            type="submit"
          >
            {" "}
            Acessar{" "}
          </button>
          <Link to="/register">
            <p className="text-zinx-900 text-xs font-medium hover:font-bold">
              Ainda não possui uma conta? Cadastra-se
            </p>
          </Link>
        </form>
      </section>
    </Container>
  );
}
