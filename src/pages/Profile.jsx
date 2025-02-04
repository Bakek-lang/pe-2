import { useState, useEffect } from "react";
import useAuthStore from "../js/store/useAuthStore";
import ProfileEditForm from "../components/ProfileEditForm";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";

export default function Profile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function loadVenues() {
      console.log("hello");
    }

    loadVenues();
  }, []);

  function onEditingHandler() {
    setIsEditing(true);
  }

  return (
    <div>
      {" "}
      <div className="border border-black flex justify-center items-center flex-col rounded-lg">
        <div className="flex justify-center mt-6 flex-col items-center">
          <img
            src={user.data.avatar.url}
            alt={user.data.avatar.alt}
            className=" h-28 w-28 rounded-full object-cover border border-blue-400"
          />
        </div>
        <h1 className="text-3xl font-medium">{user.data.name}</h1>
        <span className="">{user.data.bio || "No bio yet."}</span>
        <div className=" mb-3 flex  items-center">
          <span className="mr-2">Venue Manager:</span>
          {user.data.venueManager ? (
            <IoIosCheckmarkCircle color="green" size={30} />
          ) : (
            <FaCircleXmark color="red" size={30} />
          )}
        </div>
        <button
          onClick={onEditingHandler}
          className="py-2 px-3 bg-blue-500 rounded-lg text-white mb-3"
        >
          Update Profile
        </button>
      </div>
      {!isEditing ? (
        <div className="flex flex-col">
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
          <span>Venues</span>
        </div>
      ) : (
        <ProfileEditForm />
      )}
    </div>
  );
}
