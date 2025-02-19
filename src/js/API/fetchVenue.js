/**
 * Fetches details of a specific venue by its ID from the Holidaze API.
 *
 * @param {string} id - The unique identifier of the venue.
 * @returns {Promise<Object>} A promise that resolves to the venue details, including owner and bookings.
 * @throws {Error} Throws an error if the request fails.
 */
export async function fetchVenueById(id) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch venue details: ", error);
    throw error;
  }
}
