import { NavLink } from "react-router-dom";
import useAuthStore from "../js/store/useAuthStore";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
  const { isLoggedIn, user } = useAuthStore();

  return (
    <nav>
      <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/">
          <h1 className="text-4xl text-white">Holidaze</h1>
        </NavLink>
        {isLoggedIn ? (
          <DropdownMenu />
        ) : (
          <div className="flex justify-center items-center">
            <NavLink to="/register" className="text-white text-2xl">
              Register
            </NavLink>
            <NavLink to="/login" className="ml-6 text-white text-2xl">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
