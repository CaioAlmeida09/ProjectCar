import { Container } from "../../components/container";
import ney from "../../assets/ney.webp";

export function Home() {
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
        <section className=" flex flex-col px-3 py-2 items-center w-full bg-white">
          <img
            src={ney}
            className="w-full max-h-72 hover:scale-105 transition-all"
          />
          <h2 className="text-black font-bold text-lg mt-6"> Nome do Carro </h2>
          <div className="mt-3 flex flex-col gap-8 mb-3 items-center">
            <p> 2001/2002 | 87987km</p>
            <strong className="font-medium text-zinc-700 text-lg">
              Rs 45498.00
            </strong>
          </div>
          <div className="w-full h-px bg-slate-400"> </div>
          <p className=" text-zinc-700 text-xs mt-3"> Cidade </p>
        </section>
        <section className=" flex flex-col px-3 py-2 items-center w-full bg-white">
          <img
            src={ney}
            className="w-full max-h-72 hover:scale-105 transition-all"
          />
          <h2 className="text-black font-bold text-lg mt-6"> Nome do Carro </h2>
          <div className="mt-3 flex flex-col gap-8 mb-3 items-center">
            <p> 2001/2002 | 87987km</p>
            <strong className="font-medium text-zinc-700 text-lg">
              Rs 45498.00
            </strong>
          </div>
          <div className="w-full h-px bg-slate-400"> </div>
          <p className=" text-zinc-700 text-xs mt-3"> Cidade </p>
        </section>
        <section className=" flex flex-col px-3 py-2 items-center w-full bg-white">
          <img
            src={ney}
            className="w-full max-h-72 hover:scale-105 transition-all"
          />
          <h2 className="text-black font-bold text-lg mt-6"> Nome do Carro </h2>
          <div className="mt-3 flex flex-col gap-8 mb-3 items-center">
            <p> 2001/2002 | 87987km</p>
            <strong className="font-medium text-zinc-700 text-lg">
              Rs 45498.00
            </strong>
          </div>
          <div className="w-full h-px bg-slate-400"> </div>
          <p className=" text-zinc-700 text-xs mt-3"> Cidade </p>
        </section>
        <section className=" flex flex-col px-3 py-2 items-center w-full bg-white">
          <img
            src={ney}
            className="w-full max-h-72 hover:scale-105 transition-all"
          />
          <h2 className="text-black font-bold text-lg mt-6"> Nome do Carro </h2>
          <div className="mt-3 flex flex-col gap-8 mb-3 items-center">
            <p> 2001/2002 | 87987km</p>
            <strong className="font-medium text-zinc-700 text-lg">
              Rs 45498.00
            </strong>
          </div>
          <div className="w-full h-px bg-slate-400"> </div>
          <p className=" text-zinc-700 text-xs mt-3"> Cidade </p>
        </section>
        <section className=" flex flex-col px-3 py-2 items-center w-full bg-white">
          <img
            src={ney}
            className="w-full max-h-72 hover:scale-105 transition-all"
          />
          <h2 className="text-black font-bold text-lg mt-6"> Nome do Carro </h2>
          <div className="mt-3 flex flex-col gap-8 mb-3 items-center">
            <p> 2001/2002 | 87987km</p>
            <strong className="font-medium text-zinc-700 text-lg">
              Rs 45498.00
            </strong>
          </div>
          <div className="w-full h-px bg-slate-400"> </div>
          <p className=" text-zinc-700 text-xs mt-3"> Cidade </p>
        </section>
      </main>
    </Container>
  );
}
