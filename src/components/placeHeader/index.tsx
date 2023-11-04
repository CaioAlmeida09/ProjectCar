import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseconection";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function PlaceHeader() {
  const navigate = useNavigate();
  function handleLogout() {
    signOut(auth);
    navigate("/login");
  }

  return (
    <div className="w-screen md:px-3 px-2 h-16 flex justify-center mt-3">
      <header className="flex w-screen px-3 py-1 items-center justify-between bg-red-500 text-white md:text-xl text-xs font-medium mr-3 h-10 rounded-md">
        <section className="flex gap-5">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/new">Novo Carro</Link>
        </section>
        <button onClick={handleLogout}>
          {" "}
          <MdOutlineLogout size={30} />{" "}
        </button>
      </header>
    </div>
  );
}
