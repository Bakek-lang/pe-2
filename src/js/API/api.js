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
