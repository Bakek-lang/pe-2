import { useState } from "react";
import useAuthStore from "../js/store/useAuthStore";
import useNotificationStore from "../js/store/useNotificationStore";
import { updateVenue } from "../js/API/updateVenue";
import { useNavigate } from "react-router-dom";

export default function UpdateVenuePage({ venue }) {
  const { accessToken } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  const [name, setName] = useState(venue.name);
  const [description, setDescription] = useState(venue.description);
  const [imageUrl, setImageUrl] = useState(venue.media[0].url);
  const [price, setPrice] = useState(venue.price);
  const [maxGuests, setMaxGuests] = useState(venue.maxGuests);

  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

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
      meta,
    };

    try {
      const updatedVenue = await updateVenue(venueData, accessToken, venue.id);
      console.log("Updated Venue: ", updatedVenue);
      addNotification("Updated Venue successfully!", "success");
      navigate(`/venue/${updatedVenue.data.id}`);
    } catch (error) {
      console.log("Updating venue failed:", error.message);
      addNotification("Failed to update venue.", "error");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Venue</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>Venue Title</label>
        <input
          type="text"
          placeholder="Venue Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-2 border rounded"
        ></textarea>

        <label>Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="p-2 border rounded"
        />

        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="p-2 border rounded"
        />

        <label>Max Guests</label>
        <input
          type="number"
          placeholder="Max Guests"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          required
          min="1"
          className="p-2 border rounded"
        />
        <div className="flex justify-around gap-2 md:text-xl items-center">
          <label className="flex items-center ">
            <input
              type="checkbox"
              checked={meta.wifi}
              onChange={(e) =>
                setMeta((prevMeta) => ({ ...prevMeta, wifi: e.target.checked }))
              }
              className="mr-2 md:h-5 md:w-5 "
            />
            Wifi
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={meta.parking}
              onChange={(e) =>
                setMeta((prevMeta) => ({
                  ...prevMeta,
                  parking: e.target.checked,
                }))
              }
              className="mr-2 md:h-5 md:w-5 "
            />
            Parking
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={meta.breakfast}
              onChange={(e) =>
                setMeta((prevMeta) => ({
                  ...prevMeta,
                  breakfast: e.target.checked,
                }))
              }
              className="mr-2 md:h-5 md:w-5 "
            />
            Breakfast
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={meta.pets}
              onChange={(e) =>
                setMeta((prevMeta) => ({ ...prevMeta, pets: e.target.checked }))
              }
              className="mr-2 md:h-5 md:w-5 "
            />
            Pets
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Venue
        </button>
      </form>
    </div>
  );
}
