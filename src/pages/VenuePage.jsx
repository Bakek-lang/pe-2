import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVenueById } from "../js/utils/fetchVenue";

export default function VenuePage() {
  const [venue, setVenue] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    async function loadVenue() {
      try {
        const venueData = await fetchVenueById(id);
        console.log("This is the venue data: ", venueData);
        setVenue(venueData);
      } catch (error) {
        console.log("Error getting venue data: ", error);
      }
    }

    loadVenue();
  }, [id]);

  return (
    <div>
      VENUE PAGE with id: {id}, and venue is: {venue.title}
    </div>
  );
}
