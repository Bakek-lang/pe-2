import { FaStar } from "react-icons/fa6";
import { deleteBooking } from "../js/API/deleteBooking";
import useAuthStore from "../js/store/useAuthStore";
import useNotificationStore from "../js/store/useNotificationStore";
import { shortenTitle } from "../js/utils/shortenTitle";
import { Link } from "react-router-dom";

export default function BookingCard({ booking, onDelete }) {
  const { addNotification } = useNotificationStore();
  const { accessToken } = useAuthStore();

  const formattedStartDate = new Date(booking.dateFrom).toLocaleDateString();
  const formattedEndDate = new Date(booking.dateTo).toLocaleDateString();

  async function handleDelete(event) {
    event.stopPropagation();
    event.preventDefault();
    try {
      const deletedBooking = await deleteBooking(booking.id, accessToken);
      console.log("Deleted booking: ", deletedBooking);
      addNotification("Booking deleted successfully!", "success");

      if (onDelete) {
        onDelete(booking.id);
      }
    } catch (error) {
      addNotification("Failed to delete venue.", "error");
    }
  }
  return (
    <Link to={`/venue/${booking.venue.id}`}>
      {" "}
      <div className="rounded-lg shadow-lg m-4 pb-4 flex flex-col max-w-sm h-lg w-96 ">
        <img
          src={booking.venue.media[0].url}
          alt="/"
          className="w-full h-60 object-cover rounded-t-lg"
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = "https://placehold.co/600x400";
          }}
        />
        <div className="p-2">
          <div className="flex justify-between ">
            <h2 className="text-xl font-bold">
              {shortenTitle(booking.venue.name, 15)}
            </h2>
            <div className="flex justify-center items-center">
              <FaStar />
              <p className="ml-0.5">{booking.venue.rating}</p>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <span>
              Check-in:{" "}
              <span className="font-semibold">{formattedStartDate}</span>
            </span>
            <span>
              Check-out:{" "}
              <span className="font-semibold">{formattedEndDate}</span>
            </span>
            <span>
              Guests: <span className="font-semibold">{booking.guests}</span>
            </span>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleDelete}
              className="py-2 px-3 bg-red-500 text-white rounded-lg"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
