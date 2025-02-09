import { FaStar, FaUsers, FaMoneyBillAlt } from "react-icons/fa";
import { shortenText } from "../js/utils/shortenText";
import { Link, useNavigate } from "react-router-dom";
import { renderFeatures } from "../js/utils/features";
import { shortenTitle } from "../js/utils/shortenTitle";
import useAuthStore from "../js/store/useAuthStore";
import { deleteVenue } from "../js/API/deleteVenue";
import useNotificationStore from "../js/store/useNotificationStore";

export default function VenueCard({ venue, showActions = false, onDelete }) {
  const { addNotification } = useNotificationStore();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  async function handleDelete(event) {
    event.stopPropagation();
    event.preventDefault();
    try {
      const deletedVenue = await deleteVenue(venue.id, accessToken);
      console.log("deleted venue: ", deletedVenue);
      addNotification("Venue deleted successfully!", "success");

      if (onDelete) {
        onDelete(venue.id);
      }
    } catch (error) {
      addNotification("Failed to delete venue.", "error");
    }
  }

  function handleUpdate(event) {
    event.stopPropagation();
    event.preventDefault();

    navigate(`/update-venue/${venue.id}`);
  }

  return (
    <Link to={`/venue/${venue.id}`}>
      <div className="rounded-lg shadow-lg w-80 m-4 pb-4 flex flex-col h-96  ">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg">
          <img
            src={venue.media[0].url}
            alt="/"
            className="w-full h-full object-cover"
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = "https://placehold.co/600x400";
            }}
          />
        </div>
        <div className="p-2">
          <p className="text-gray-500">
            {venue.location?.country
              ? venue.location.city
                ? `${venue.location.city}, ${venue.location.country}`
                : venue.location.country
              : "Location not available"}
          </p>
          <div className="flex justify-between ">
            <h2 className="text-xl font-bold">
              {shortenTitle(venue.name, 15)}
            </h2>
            <div className="flex justify-center items-center">
              <FaStar />
              <p className="ml-0.5">{venue.rating}</p>
            </div>
          </div>
          <p>{shortenText(venue.description, 20)}</p>
          <div className="flex items-center mt-2">
            <FaUsers className="text-2xl" />
            <p className="ml-1">Max Guests: {venue.maxGuests}</p>
          </div>
          <div className="flex items-center">
            <FaMoneyBillAlt className="text-2xl" />
            <p className="ml-1">{venue.price} NOK per night</p>
          </div>
          <div className="flex justify-between mt-4">
            {renderFeatures(venue)}
          </div>
          {showActions && (
            <div className="mt-4 flex justify-around">
              <button
                className="py-2 px-3 rounded-lg text-white bg-blue-500"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="py-2 px-3 rounded-lg text-white bg-red-500"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
