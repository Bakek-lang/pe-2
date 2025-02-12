import { useState } from "react";
import Calendar from "react-calendar";
import { createBooking } from "../js/API/createBooking";
import useAuthStore from "../js/store/useAuthStore";
import useNotificationStore from "../js/store/useNotificationStore";

export default function BookingCalendar({ bookings, venueId, maxGuests }) {
  const { accessToken } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const [selectedRange, setSelectedRange] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isDateBooked(date) {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);

      return date >= bookingStart && date < bookingEnd;
    });
  }

  function tileClassName({ date, view }) {
    if ((view = "month")) {
      return isDateBooked(date)
        ? "bg-gray-400 text-black cursor-not-allowed "
        : "hover:bg-green-600 hover:text-white rounded-full cursor-pointer";
    }

    return "";
  }

  async function handleBooking() {
    if (!selectedRange || selectedRange.length !== 2) {
      addNotification("Please select a valid date range.", "error");
      return;
    }
    setIsSubmitting(true);

    const [dateFrom, dateTo] = selectedRange;

    const bookingData = {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      guests: guests,
      venueId: venueId,
    };

    try {
      const bookingVenue = await createBooking(bookingData, accessToken);
      console.log("Booked venue: ", bookingVenue);
      addNotification("Booked Venue successfully!", "success");
    } catch (error) {
      console.log("Booking venue failed: ", error.message);
      addNotification("Failed to create a booking. ", "error");
    }
  }

  return (
    <div className="max-w-sm mx-auto p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold mb-2 text-center">Booking Calendar</h2>
      <Calendar
        selectRange={true}
        onChange={setSelectedRange}
        value={selectedRange}
        tileClassName={tileClassName}
        next2Label={null}
        prev2Label={null}
      />
      <div className="mt-4 text-center">
        {selectedRange && selectedRange.length === 2 && (
          <p>
            Selected: {selectedRange[0].toLocaleDateString()} -{" "}
            {selectedRange[1].toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-center ">
        <label className="font-semibold">Guests:</label>
        <input
          type="number"
          min={1}
          max={maxGuests}
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
    </div>
  );
}
