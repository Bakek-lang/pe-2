import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVenueById } from "../js/API/fetchVenue";

export default function VenueBookingsPage() {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);

  useEffect(() => {
    async function loadVenue() {
      try {
        const venueData = await fetchVenueById(venueId);
        setVenue(venueData.data);
      } catch (error) {
        console.log("Error getting venue data.", error);
        setIsError("Error fetching venue data.");
      }
      setIsLoading(false);
    }

    loadVenue();
  }, [venueId]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!venue) return <div className="p-4 ">No venue found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bookings for {venue.name}</h2>
      {!venue.bookings || venue.bookings.length === 0 ? (
        <p>No bookings found for this venue.</p>
      ) : (
        <div className="flex">
          {venue.bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border rounded-lg shadow p-4  "
            >
              <p>
                <span className="font-semibold">Booking ID:</span> {booking.id}
              </p>
              <p>
                <span className="font-semibold">Date From:</span>{" "}
                {new Date(booking.dateFrom).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Date To:</span>{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Guests:</span> {booking.guests}
              </p>
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {booking.customer.email}
              </p>
              <p>
                <span className="font-semibold">Guests:</span> {booking.guests}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
