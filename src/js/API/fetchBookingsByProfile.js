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
        API_BOOKINGS,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const bookings = await response.json();
    console.log("This is bookings: ", bookings);
    return bookings.data || [];
  } catch (error) {
    console.log("Failed to fetch venues: ", error);
    return [];
  }
}
