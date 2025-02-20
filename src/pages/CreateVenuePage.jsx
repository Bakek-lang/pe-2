import { useEffect, useState } from "react";
import { createVenue } from "../js/API/createVenue";
import useAuthStore from "../js/store/useAuthStore";
import useNotificationStore from "../js/store/useNotificationStore";
import { useNavigate } from "react-router-dom";

export default function CreateVenuePage() {
  useEffect(() => {
    document.title = "Create Venue | Holidaze";
  }, []);

  const { accessToken } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [rating, setRating] = useState("");

  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  function handleImageChange(index, value) {
    setImageUrls((prevImageUrls) => {
      const updated = [...prevImageUrls];
      updated[index] = value;
      return updated;
    });
  }

  function handleAddImage() {
    setImageUrls((prevImageUrls) => [...prevImageUrls, ""]);
  }

  function handleRemoveImage(index) {
    setImageUrls((prevImageUrls) =>
      prevImageUrls.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const filteredImages = imageUrls.filter((url) => url.trim() !== "");

    const venueData = {
      name,
      description,
      ...(filteredImages.length > 0 && {
        media: filteredImages.map((url) => ({
          url,
          alt: `Image of ${name}`,
        })),
      }),
      rating: Number(rating),
      price: Number(price),
      maxGuests: Number(maxGuests),
      meta,
    };

    try {
      const createdVenue = await createVenue(venueData, accessToken);
      addNotification("Created Venue successfully!", "success");
      navigate(`/venue/${createdVenue.data.id}`);
    } catch (error) {
      console.error("Creating venue failed", error.message);
      addNotification(`${error.message}`, "error");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Venue</h1>
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

        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              maxLength={300}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="p-2 border rounded flex-1"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddImage}
          className="bg-green-500 text-black p-2 rounded"
        >
          Add Another Image
        </button>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          max="10000"
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Rating"
          className="p-2 border rounded"
          min="1"
          max="5"
          required
          onChange={(e) => setRating(e.target.value)}
          value={rating}
        />

        <input
          type="number"
          placeholder="Max Guests"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          required
          min="1"
          max="100"
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
          Create Venue
        </button>
      </form>
    </div>
  );
}
