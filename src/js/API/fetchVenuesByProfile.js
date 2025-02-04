import useAuthStore from "../store/useAuthStore";
import { API_BASE, API_HOLIDAZE, API_PROFILES, API_VENUES } from "./constants";

export async function fetchVenuesByProfile() {
  const { user } = useAuthStore();
  try {
    const response = await fetch(
      API_BASE + API_HOLIDAZE + API_PROFILES + user.data.name + API_VENUES
    );
    const venues = await response.json();
    return venues.data;
  } catch (error) {
    console.log("Failed to fetch venues: ", error);
    return [];
  }
}
