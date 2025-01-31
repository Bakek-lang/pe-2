import useAuthStore from "../store/useAuthStore";
import { API_BASE, API_HOLIDAZE, API_KEY, API_PROFILES } from "./constants";

export async function updateUser(userData, user) {
  const response = await fetch(
    API_BASE + API_HOLIDAZE + API_PROFILES + "/" + user.data.name,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.data.accessToken}`,
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
