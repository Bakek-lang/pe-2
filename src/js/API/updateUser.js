import { API_BASE, API_HOLIDAZE, API_KEY, API_PROFILES } from "./constants";

export async function updateUser(userData, user, accessToken) {
  const response = await fetch(
    API_BASE + API_HOLIDAZE + API_PROFILES + "/" + user.data.name,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user");
  }

  return response.json();
}
