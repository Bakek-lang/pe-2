import {
  API_BASE,
  API_BOOKINGS,
  API_HOLIDAZE,
  API_KEY,
  API_PROFILES,
} from "./constants";

export async function fetchBookingsByProfile(user, accessToken) {
  try {
    const response = await fetch(
      API_BASE +
        API_HOLIDAZE +
        API_PROFILES +
        "/" +
        user.data.name +
        API_BOOKINGS +
        "?_venue=true",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const bookings = await response.json();
    return bookings.data || [];
  } catch (error) {
    console.error("Failed to fetch venues: ", error);
    return [];
  }
}
