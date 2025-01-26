import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchVenues(pageNumber) {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues?limit=30&page=${pageNumber}`
    );
    const data = await response.json();
    console.log("data", data);

    const venuesWithImages = data.data.filter(
      (venue) => venue.media && venue.media.length > 0
    );

    setVenues((prev) => [...prev, ...venuesWithImages]);
    console.log("venues", venues);
  }

  useEffect(() => {
    fetchVenues(page);
  }, [page]);

  function handleViewMore() {
    setPage((prevPage) => prevPage + 1);
  }

  /* useEffect(() => {
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

  console.log("all venues", venues);
  const firstVenues = venues.slice(0, 20);
  console.log("first 20 venues: ", firstVenues); */

  console.log("all venues", venues);

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
