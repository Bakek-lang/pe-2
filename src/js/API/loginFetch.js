import { API_AUTH, API_BASE, API_LOGIN } from "./constants";
/**
 * Logs in a user by sending a POST request to the Holidaze API.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the user's authentication data.
 * @throws {Error} Throws an error if the login fails, with a message from the API response.
 */
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
    throw new Error(errorData.errors[0].message || "Login failed");
  }

  return response.json();
}
