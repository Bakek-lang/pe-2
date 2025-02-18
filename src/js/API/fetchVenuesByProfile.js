import {
  API_BASE,
  API_HOLIDAZE,
  API_KEY,
  API_PROFILES,
  API_VENUES,
} from "./constants";

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
    console.log("Failed to fetch venues: ", error);
    return [];
  }
}
