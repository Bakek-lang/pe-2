import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex">
        <li className="p-2">
          <NavLink to="/">Holidaze</NavLink>
        </li>
      </ul>
    </nav>
  );
}
