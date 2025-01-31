import { useRef, useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../js/store/useAuthStore";

export default function DropdownMenu() {
  const { user, clearUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const toggleContainer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  function onClickHandler() {
    setIsOpen((prevState) => !prevState);
  }

  function onSignOut() {
    clearUser();
    setIsOpen(false);
    navigate("/");
  }

  useEffect(() => {
    function onClickOutsideHandler(event) {
      if (
        toggleContainer.current &&
        !toggleContainer.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", onClickOutsideHandler);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutsideHandler);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div ref={toggleContainer} className="flex items-center">
      <button
        type="button"
        className="flex text-sm rounded-full mr-1"
        aria-expanded="false"
        onClick={onClickHandler}
      >
        <span className="sr-only">Open user menu</span>
        <CgProfile size={30} />
      </button>

      {isOpen && (
        <div
          className="z-20 absolute top-full right-0 mr-4 text-base bg-white divide-y divide-gray-200 rounded-lg shadow border border-gray-200"
          id="profile-dropdown"
        >
          <div className="px-4 py-3">
            <img
              className="w-16 h-16 object-cover rounded-full mx-auto mb-2 border"
              src={user.data.avatar.url}
              alt={user.data.avatar.alt}
            />
            <span className="block text-sm text-gray-800">
              {user.data.name}
            </span>
            <span className="block text-sm text-gray-400">
              {user.data.email}
            </span>
            <div className="mt-4">
              <span>Venue Manager:</span>
            </div>
          </div>
          <ul className="py-2">
            <li>
              <NavLink
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700">
                View Venues
              </NavLink>
            </li>
            <li>
              <button
                onClick={onSignOut}
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
