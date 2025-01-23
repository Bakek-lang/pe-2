import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";

export default function Home() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues");
      const data = await response.json();
      console.log("data", data);
      setVenues(data.data);
    }
    getData();
  }, []);

  console.log("venues:", venues);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {venues.map((venue) => (
          <VenueCard venue={venue} key={venue.id} />
        ))}
      </div>
    </div>
  );
}
