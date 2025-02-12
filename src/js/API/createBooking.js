import { API_BASE, API_BOOKINGS, API_HOLIDAZE, API_KEY } from "./constants";

export async function createBooking(bookingData, accessToken) {
  const response = await fetch(API_BASE + API_HOLIDAZE + API_BOOKINGS, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  console.log("Response from createBooking: ", response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create venue");
  }

  return response.json();
}
