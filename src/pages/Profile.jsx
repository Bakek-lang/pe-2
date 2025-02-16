import { useState, useEffect } from "react";
import useAuthStore from "../js/store/useAuthStore";
import ProfileEditForm from "../components/ProfileEditForm";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import { fetchVenuesByProfile } from "../js/API/fetchVenuesByProfile";
import VenueCard from "../components/VenueCard";
import { fetchBookingsByProfile } from "../js/API/fetchBookingsByProfile";
import BookingCard from "../components/bookingCard";
import VenueCardSkeleton from "../skeleton/VenueCardSkeleton";
import UserProfileSkeleton from "../skeleton/UserProfileSkeleton";
import BookingCardSkeleton from "../skeleton/BookingCardSkeleton";

export default function Profile() {
  const { user, accessToken } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user.data.venueManager) {
      async function loadVenues() {
        const profileVenues = await fetchVenuesByProfile(user, accessToken);
        console.log("This is profileVenues:", profileVenues);
        setVenues(profileVenues);
        setIsLoading(false);
      }

      loadVenues();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (!user.data.venueManager) {
      async function loadBookings() {
        const profileBookings = await fetchBookingsByProfile(user, accessToken);
        console.log("This is profileBookings: ", profileBookings);
        setBookings(profileBookings);
        setIsLoading(false);

        console.log("bookings: ", bookings);
      }

      loadBookings();
    }
  }, [user]);

  function onEditingHandler() {
    setIsEditing(true);
  }

  function handleVenueDelete(deletedVenueId) {
    setVenues((prevVenues) =>
      prevVenues.filter((venue) => venue.id !== deletedVenueId)
    );
  }

  function handleBookingDelete(deletedBookingId) {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== deletedBookingId)
    );
  }

  return (
    <div className="flex gap-6 p-6 md:flex-row flex-col ">
      {isLoading ? (
        <UserProfileSkeleton />
      ) : (
        <div className="border border-gray-300 flex flex-col items-center shadow-md rounded-lg md:w-1/3 md:self-start p-6">
          <div className="flex flex-col items-center">
            {!imageLoaded && (
              <div className="h-28 w-28 rounded-full bg-gray-300 border animate-pulse" />
            )}
            <img
              src={user.data.avatar.url}
              alt={user.data.avatar.alt}
              className={`h-28 w-28 rounded-full object-cover border border-blue-400 ${
                imageLoaded ? "block" : "hidden"
              }`}
              onLoad={() => setImageLoaded(true)}
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
      )}

      <div className="w-full">
        {!isEditing ? (
          <div className="border border-gray-300 shadow-md rounded-lg">
            <div className="p-6 flex justify-center ">
              {user.data.venueManager ? (
                <div>
                  <h2 className="text-3xl mb-4">My Venues:</h2>
                  <div className="flex flex-wrap  justify-center md:justify-start gap-y-4">
                    {isLoading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <VenueCardSkeleton key={index} />
                      ))
                    ) : venues.length > 0 ? (
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
                  <div className="flex flex-wrap  items-center">
                    {isLoading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <BookingCardSkeleton key={index} />
                      ))
                    ) : bookings.length > 0 ? (
                      bookings.map((booking, index) => (
                        <BookingCard
                          booking={booking}
                          key={index}
                          onDelete={handleBookingDelete}
                        />
                      ))
                    ) : (
                      <p>No upcoming bookings.</p>
                    )}
                  </div>
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
