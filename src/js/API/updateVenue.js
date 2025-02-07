import { API_BASE, API_HOLIDAZE, API_KEY, API_VENUES } from "./constants";

export async function updateVenue(venueData, accessToken, id) {
  const response = await fetch(
    API_BASE + API_HOLIDAZE + API_VENUES + `/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venueData),
    }
  );
  console.log("Response: ", response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update venue");
  }

  return response.json();
}
