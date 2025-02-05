import { useState, useEffect } from "react";
import useAuthStore from "../js/store/useAuthStore";
import ProfileEditForm from "../components/ProfileEditForm";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import { fetchVenuesByProfile } from "../js/API/fetchVenuesByProfile";
import VenueCard from "../components/VenueCard";

export default function Profile() {
  const { user, accessToken } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function loadVenues() {
      const profileVenues = await fetchVenuesByProfile(user, accessToken);
      console.log("This is profileVenues:", profileVenues);
      setVenues(profileVenues);
    }

    loadVenues();
  }, [user]);

  function onEditingHandler() {
    setIsEditing(true);
  }

  function handleVenueDelete(deletedVenueId) {
    setVenues((prevVenues) =>
      prevVenues.filter((venue) => venue.id !== deletedVenueId)
    );
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
        {!isEditing && (
          <button
            onClick={onEditingHandler}
            className="py-2 px-3 bg-blue-500 rounded-lg text-white mb-3"
          >
            Update Profile
          </button>
        )}
      </div>
      {!isEditing ? (
        <div>
          {" "}
          <h2 className="text-3xl p-4">Venues:</h2>
          <div className="flex  flex-wrap  gap-4 p-4 items-center">
            {venues.map((venue, index) => (
              <VenueCard
                venue={venue}
                key={`${venue.id}-${index}`}
                showActions={true}
                onDelete={handleVenueDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <ProfileEditForm setIsEditing={setIsEditing} />
      )}
    </div>
  );
}
