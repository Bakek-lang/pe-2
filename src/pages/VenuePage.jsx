import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaUsers, FaMoneyBillAlt } from "react-icons/fa";
import { renderFeatures } from "../js/utils/features";
import { fetchVenueById } from "../js/API/fetchVenue";
import BookingCalendar from "../components/BookingCalendar";

export default function VenuePage() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (venue && venue.media && venue.media.length > 0) {
      setMainImage({
        url: venue.media[0].url,
        alt: venue.media[0].alt,
      });
    }
  }, [venue]);

  function handleImageError(event) {
    event.target.onerror = null;
    event.target.src = "https://placehold.co/600x400";
  }

  useEffect(() => {
    async function loadVenue() {
      try {
        setIsLoading(true);
        setIsError(false);
        const venueData = await fetchVenueById(id);
        console.log("This is the venue data: ", venueData);
        setVenue(venueData.data);
      } catch (error) {
        console.log("Error getting venue data: ", error);
      }
      setIsLoading(false);
    }

    loadVenue();
  }, [id]);

  if (isLoading || !venue) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!venue) {
    return <div>Venue not found.</div>;
  }

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="media-gallery">
        <div className="h-96 w-1/2 overflow-hidden">
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="w-full h-full object-cover rounded-t-lg"
            onError={handleImageError}
          />
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {venue.media.map((media, index) => (
            <img
              key={index}
              src={media.url}
              alt={media.alt}
              onClick={() => setMainImage({ url: media.url, alt: media.alt })}
              onError={handleImageError}
              className={`h-20 w-15 object-cover rounded cursor-pointer 
              ${
                mainImage && media.url === mainImage.url
                  ? "border-4 border-blue-400"
                  : "border border-gray-300"
              } 
              `}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="mt-2 flex items-center gap-3">
          <img
            src={venue.owner.avatar.url}
            alt={venue.owner.avatar.url}
            className="h-8 w-8 rounded-full object-cover"
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = "https://placehold.co/600x400";
            }}
          />
          <p className="text-sm">Managed by {venue.owner.name}</p>
        </div>
        <div className="flex items-center mt-1 ">
          <p className="text-lg">{venue.rating}</p>
          <FaStar className="ml-0.5" />
        </div>
      </div>
      <p className="text-gray-500">
        {venue.location?.country
          ? venue.location.city
            ? `${venue.location.city}, ${venue.location.country}`
            : venue.location.country
          : "Location not available"}
      </p>

      <h1 className="text-2xl ">{venue.name}</h1>
      <p className="mt-2">{venue.description}</p>
      <div className="flex items-center mt-2">
        <FaUsers size={40} />
        <p className="ml-1">Max Guests: {venue.maxGuests}</p>
      </div>
      <div className="flex items-center">
        <FaMoneyBillAlt size={40} />
        <p className="ml-1">{venue.price} NOK per night</p>
      </div>
      <div>
        <div className="flex justify-between mt-4">{renderFeatures(venue)}</div>
      </div>
      <div>
        <BookingCalendar
          bookings={venue.bookings || []}
          venueId={venue.id}
          maxGuests={venue.maxGuests}
        />
      </div>
    </div>
  );
}
