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
    <div className="flex gap-6 p-6">
      <div className="border border-gray-300 flex flex-col items-center shadow-md rounded-lg w-1/3 self-start p-6">
        <div className="flex flex-col items-center">
          <img
            src={user.data.avatar.url}
            alt={user.data.avatar.alt}
            className="h-28 w-28 rounded-full object-cover border border-blue-400"
          />
          <h1 className="text-3xl font-medium mt-4">{user.data.name}</h1>
          <span className="mt-2 text-center">
            {user.data.bio || "No bio yet."}
          </span>
          <div className="mb-3 flex items-center mt-4">
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
              className="py-2 px-3 bg-blue-500 rounded-lg text-white mt-4"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>

      <div className="w-full">
        {!isEditing ? (
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              {user.data.venueManager ? (
                <div>
                  <h2 className="text-3xl mb-4">My Venues:</h2>
                  <div className="flex flex-wrap gap-4 items-center">
                    {venues.length > 0 ? (
                      venues.map((venue, index) => (
                        <VenueCard
                          venue={venue}
                          key={`${venue.id}-${index}`}
                          showActions={true}
                          onDelete={handleVenueDelete}
                        />
                      ))
                    ) : (
                      <p>No venues found.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl mb-4">Upcoming Bookings:</h2>
                  <p>No upcoming bookings.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ProfileEditForm setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
