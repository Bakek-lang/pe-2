import {
  API_BASE,
  API_HOLIDAZE,
  API_KEY,
  API_PROFILES,
  API_VENUES,
} from "./constants";
/**
 * Fetches all venues associated with a given user profile from the Holidaze API.
 *
 * @param {Object} user - The user object containing profile details.
 * @param {string} user.data.name - The username used to fetch venues.
 * @param {string} accessToken - The user's access token for authentication.
 * @returns {Promise<Object[]>} A promise that resolves to an array of venue objects.
 * If an error occurs, an empty array is returned.
 */
export async function fetchVenuesByProfile(user, accessToken) {
  try {
    const response = await fetch(
      API_BASE +
        API_HOLIDAZE +
        API_PROFILES +
        "/" +
        user.data.name +
        API_VENUES +
        `?_bookings=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const venues = await response.json();
    return venues.data || [];
  } catch (error) {
    console.error("Failed to fetch venues: ", error);
    return [];
  }
}
