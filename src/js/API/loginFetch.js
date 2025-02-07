import { API_AUTH, API_BASE, API_LOGIN } from "./constants";

export async function loginUser(email, password) {
  const response = await fetch(
    API_BASE + API_AUTH + API_LOGIN + "?_holidaze=true",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}
