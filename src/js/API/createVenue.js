import { API_BASE, API_HOLIDAZE, API_KEY, API_VENUES } from "./constants";

export async function createVenue(venueData, accessToken) {
  const response = await fetch(API_BASE + API_HOLIDAZE + API_VENUES, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venueData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create venue");
  }

  return response.json();
}
