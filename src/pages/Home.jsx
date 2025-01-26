import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";

export default function Home() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/venues?limit=30"
      );
      const data = await response.json();
      console.log("data", data);
      setVenues(data.data);
    }
    getData();
  }, []);

  const firstVenues = venues.slice(0, 20);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {firstVenues.map((venue, index) => (
          <VenueCard venue={venue} key={`${venue.id}-${index}`} />
        ))}
      </div>
    </div>
  );
}
