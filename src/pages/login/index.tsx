import { Container } from "../../components/container";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
export function Login() {
  return (
    <Container>
      <section className="flex flex-col w-full h-screen justify-start mt-16 items-center ">
        <main className="flex flex-col w-3/4 max-w-2xl md:px-6 md:py-4 px-2 py-4 gap-7 bg-white drop-shadow items-center">
          <img src={logo} alt="logo" />
          <input
            className="w-full h-10 rounded-lg border-2 px-2 text-zinc-900"
            placeholder="Digite seu e-mail..."
          />
          <input
            className="w-full h-10 rounded-lg border-2 px-2 "
            placeholder="******"
          />
          <button className="bg-black w-full h-9 rounded-lg text-white font-medium">
            {" "}
            Acessar{" "}
          </button>
          <Link to="/register">
            <p className="text-zinx-900 text-xs font-medium hover:font-bold">
              Ainda não possui uma conta? Cadastra-se
            </p>
          </Link>
        </main>
      </section>
    </Container>
  );
}
