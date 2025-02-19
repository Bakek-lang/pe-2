import { API_BASE, API_BOOKINGS, API_HOLIDAZE, API_KEY } from "./constants";
/**
 * Creates a new booking by sending a POST request to the Holidaze API.
 *
 * @param {Object} bookingData - The booking details to be sent in the request body.
 * @param {string} accessToken - The user's access token for authentication.
 * @returns {Promise<Object>} A promise that resolves to the created booking data.
 * @throws {Error} Throws an error if the request fails, with a message from the API response.
 */
export async function createBooking(bookingData, accessToken) {
  const response = await fetch(API_BASE + API_HOLIDAZE + API_BOOKINGS, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].message || "Failed to create booking");
  }

  return response.json();
}
