import { API_BASE, API_BOOKINGS, API_HOLIDAZE, API_KEY } from "./constants";

export async function deleteBooking(bookingId, accessToken) {
  const response = await fetch(
    API_BASE + API_HOLIDAZE + API_BOOKINGS + "/" + bookingId,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete booking");
  }

  if (response.status === 204) {
    return true;
  }

  return response.json();
}
