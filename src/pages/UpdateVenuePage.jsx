import { useState } from "react";
import useAuthStore from "../js/store/useAuthStore";
import useNotificationStore from "../js/store/useNotificationStore";
import { updateVenue } from "../js/API/updateVenue";

export default function UpdateVenuePage({ venue }) {
  const { accessToken } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [rating, setRating] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const venueData = {
      name,
      description,
      ...(imageUrl && {
        media: [
          {
            url: imageUrl,
            alt: `Image of ${name}`,
          },
        ],
      }),
      price: Number(price),
      maxGuests: Number(maxGuests),
      rating: parseFloat(rating),
    };

    try {
      const updatedVenue = await updateVenue(venueData, accessToken, venue.id);
      console.log("Updated Venue: ", updateVenue);
      addNotification("Updated Venue successfully!", "success");
    } catch (error) {
      console.log("Updating venue failed:", error.message);
      addNotification("Failed to update venue.", "error");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Venue</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Venue Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-2 border rounded"
        ></textarea>

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Max Guests"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          required
          min="1"
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          min="0"
          max="5"
          className="p-2 border rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Venue
        </button>
      </form>
    </div>
  );
}
