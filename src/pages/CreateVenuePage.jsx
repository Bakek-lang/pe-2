import { useState } from "react";

export default function CreateVenuePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [rating, setRating] = useState("");

  const venueData = {
    title,
    description,
    media: [
      {
        url: imageUrl,
        alt: `Image of ${title}`,
      },
    ],
    price: Number(price),
    maxGuests: Number(maxGuests),
    rating: Number(rating),
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Venue</h1>
      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Venue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          required
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
