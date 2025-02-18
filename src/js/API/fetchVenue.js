export async function fetchVenueById(id) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch venue details: ", error);
    throw error;
  }
}
