import { API_BASE, API_HOLIDAZE, API_KEY, API_VENUES } from "./constants";

export async function deleteVenue(venueId, accessToken) {
  const response = await fetch(
    API_BASE + API_HOLIDAZE + API_VENUES + "/" + venueId,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Response: ", response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete venue");
  }

  if (response.status === 204) {
    return true;
  }

  return response.json();
}
