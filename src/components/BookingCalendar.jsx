import { useState } from "react";
import Calendar from "react-calendar";

export default function BookingCalendar({ bookings }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function isDateBooked(date) {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);

      return date >= bookingStart && date < bookingEnd;
    });
  }

  function tileClassName({ date, view }) {
    if ((view = "month")) {
      return isDateBooked(date) ? "bg-red-500 text-white rounded-full" : "";
    }
    return "";
  }

  return (
    <div className="max-w-sm mx-auto p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold mb-2 text-center">Booking Calendar</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
      />
    </div>
  );
}
