/**
 * Fetches a list of venues from the Holidaze API.
 *
 * @param {number} [limit=30] - The number of venues to fetch per page.
 * @param {number} [page=1] - The page number for paginated results.
 * @returns {Promise<Object[]>} A promise that resolves to an array of venue objects.
 * If an error occurs, an empty array is returned.
 */
export async function fetchVenues(limit = 30, page = 1) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues?limit=${limit}&page=${page}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch venues: ", error);
    return [];
  }
}
