import { API_BASE, API_BOOKINGS, API_HOLIDAZE, API_KEY } from "./constants";
/**
 * Deletes a booking by sending a DELETE request to the Holidaze API.
 *
 * @param {string} bookingId - The ID of the booking to be deleted.
 * @param {string} accessToken - The user's access token for authentication.
 * @returns {Promise<boolean|Object>} A promise that resolves to `true` if the deletion is successful (status 204),
 * or the API response if additional data is returned.
 * @throws {Error} Throws an error if the request fails, with a message from the API response.
 */
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
