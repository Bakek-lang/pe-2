import { API_BASE, API_HOLIDAZE, API_KEY, API_PROFILES } from "./constants";
/**
 * Updates the user profile by sending a PUT request to the Holidaze API.
 *
 * @param {Object} userData - The updated user data to be sent in the request body.
 * @param {Object} user - The user object containing profile details.
 * @param {string} user.data.name - The username used to identify the user.
 * @param {string} accessToken - The user's access token for authentication.
 * @returns {Promise<Object>} A promise that resolves to the updated user data.
 * @throws {Error} Throws an error if the request fails, with a message from the API response.
 */
export async function updateUser(userData, user, accessToken) {
  const response = await fetch(
    API_BASE + API_HOLIDAZE + API_PROFILES + "/" + user.data.name,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user");
  }

  return response.json();
}
