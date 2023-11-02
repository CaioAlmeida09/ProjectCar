import { FiUser, FiLogIn } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/context";

export function Header() {
  const { loadingAuth, signed } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-start md:px-3 md:py-2 px-2 py-1">
      <header className="flex items-center justify-between bg-white h-20 w-screen p-3 drop-shadow">
        <Link to="/">
          <img src={logo} alt="logo" />{" "}
        </Link>
        {signed && !loadingAuth && (
          <Link
            className="border-2 rounded-full p-1 border-gray-900"
            to="/dashboard"
          >
            <FiUser size={24} />{" "}
          </Link>
        )}
        {!signed && !loadingAuth && (
          <Link
            className="border-2 rounded-full p-1 border-gray-900"
            to="/login"
          >
            <FiLogIn size={24} />
          </Link>
        )}
      </header>
    </div>
  );
}
