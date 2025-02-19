import { API_BASE, API_HOLIDAZE, API_KEY, API_VENUES } from "./constants";
/**
 * Updates a venue by sending a PUT request to the Holidaze API.
 *
 * @param {Object} venueData - The updated venue data to be sent in the request body.
 * @param {string} accessToken - The user's access token for authentication.
 * @param {string} id - The unique identifier of the venue to be updated.
 * @returns {Promise<Object>} A promise that resolves to the updated venue data.
 * @throws {Error} Throws an error if the request fails, with a message from the API response.
 */
export async function updateVenue(venueData, accessToken, id) {
  const response = await fetch(
    API_BASE + API_HOLIDAZE + API_VENUES + `/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venueData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update venue");
  }

  return response.json();
}
