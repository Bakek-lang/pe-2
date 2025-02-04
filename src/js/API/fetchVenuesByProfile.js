import {
  API_BASE,
  API_HOLIDAZE,
  API_KEY,
  API_PROFILES,
  API_VENUES,
} from "./constants";

export async function fetchVenuesByProfile(user, accessToken) {
  console.log("this is user: ", user);
  try {
    const response = await fetch(
      API_BASE +
        API_HOLIDAZE +
        API_PROFILES +
        "/" +
        user.data.name +
        API_VENUES,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const venues = await response.json();
    console.log("This is venues", venues);
    return venues.data || [];
  } catch (error) {
    console.log("Failed to fetch venues: ", error);
    return [];
  }
}
