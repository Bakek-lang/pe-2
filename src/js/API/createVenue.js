import { API_BASE, API_HOLIDAZE, API_KEY, API_VENUES } from "./constants";
/**
 * Creates a new venue by sending a POST request to the Holidaze API.
 *
 * @param {Object} venueData - The venue details to be sent in the request body.
 * @param {string} accessToken - The user's access token for authentication.
 * @returns {Promise<Object>} A promise that resolves to the created venue data.
 * @throws {Error} Throws an error if the request fails, with a message from the API response.
 */
export async function createVenue(venueData, accessToken) {
  const response = await fetch(API_BASE + API_HOLIDAZE + API_VENUES, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venueData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].message || "Failed to create venue");
  }

  return response.json();
}
