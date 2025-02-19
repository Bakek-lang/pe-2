import { API_AUTH, API_BASE, API_REGISTER } from "./constants";
/**
 * Registers a new user by sending a POST request to the Holidaze API.
 *
 * @param {string} name - The name of the user to register.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the newly created user data.
 * @throws {Error} Throws an error if the registration fails, with a message from the API response.
 */
export async function registerUser(name, email, password) {
  const response = await fetch(API_BASE + API_AUTH + API_REGISTER, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
}
