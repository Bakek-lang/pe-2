import { useState } from "react";
import Calendar from "react-calendar";
import { createBooking } from "../js/API/createBooking";
import useAuthStore from "../js/store/useAuthStore";
import useNotificationStore from "../js/store/useNotificationStore";

export default function BookingCalendar({ bookings, venueId, maxGuests }) {
  const { accessToken, user } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const [selectedRange, setSelectedRange] = useState([]);
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isDateBooked(date) {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);

      return date >= bookingStart && date < bookingEnd;
    });
  }

  function handleClickDay(date) {
    if (
      selectedRange.length !== 2 ||
      (selectedRange[0] &&
        selectedRange[1] &&
        selectedRange[0].getTime() !== selectedRange[1].getTime())
    ) {
      setSelectedRange([date, date]);
    } else {
      const start = selectedRange[0];
      if (date < start) {
        setSelectedRange([date, start]);
      } else {
        setSelectedRange([start, date]);
      }
    }
  }

  function tileClassName({ date, view }) {
    if (view === "month") {
      if (isDateBooked(date)) {
        return "bg-red-500 text-white rounded-full cursor-not-allowed";
      }
      if (selectedRange.length === 2) {
        const [start, end] = selectedRange;
        if (start.getTime() === end.getTime()) {
          if (date.toDateString() === start.toDateString()) {
            return "bg-blue-700 text-white rounded-full cursor-pointer";
          }
        } else {
          if (
            date.toDateString() === start.toDateString() ||
            date.toDateString() === end.toDateString()
          ) {
            return "bg-blue-700 text-white rounded-full cursor-pointer";
          }
          if (date > start && date < end) {
            return "bg-blue-300 text-white cursor-pointer";
          }
        }
      }
      return "hover:bg-green-600 hover:text-white rounded-full cursor-pointer";
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
      if (!user) {
        addNotification("Please log in to create a booking.", "error");
      } else {
        addNotification("Failed to create a booking. ", "error");
      }
    }
    setIsSubmitting(false);
  }

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold mb-2 text-center">Booking Calendar</h2>
      <Calendar
        selectRange={true}
        onChange={setSelectedRange}
        onClickDay={handleClickDay}
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
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleBooking}
          disabled={isSubmitting}
          className="bg-blue-500 py-2 px-4 rounded-lg text-white"
        >
          {isSubmitting ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
}
