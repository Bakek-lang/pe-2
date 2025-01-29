import { NavLink } from "react-router-dom";
import useAuthStore from "../js/store/useAuthStore";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
  const { isLoggedIn, user, clearUser } = useAuthStore();

  console.log("user: ", user);

  return (
    <nav>
      <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/">Holidaze</NavLink>
        {isLoggedIn ? (
          <DropdownMenu />
        ) : (
          <div className="flex justify-center items-center">
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login" className="ml-3">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
