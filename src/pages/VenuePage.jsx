import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVenueById } from "../js/utils/fetchVenue";

export default function VenuePage() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

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
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div>
        <img src={venue.owner.avatar.url} alt={venue.owner.avatar.url} />
      </div>
    </div>
  );
}
