import { API_BASE, API_HOLIDAZE, API_KEY, API_PROFILES } from "./constants";

export async function updateUser(userData, user, accessToken) {
  console.log("Access token: ", user.data.accessToken);
  console.log("NAme: ", user.data.name);
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
  console.log("response:", response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}
