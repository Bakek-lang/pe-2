import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import { fetchVenues } from "../js/utils/api";

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadVenues() {
      console.log("fetching page: ", page);
      const newVenues = await fetchVenues(30, page);
      console.log("this is newVenues: ", newVenues);

      const venuesWithImages = newVenues.filter(
        (venue) => venue.media && venue.media.length > 0
      );
      setVenues((prev) => [...prev, ...venuesWithImages]);
    }
    loadVenues();
  }, [page]);

  function handleViewMore() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {venues.map((venue, index) => (
          <VenueCard venue={venue} key={`${venue.id}-${index}`} />
        ))}
        <button onClick={handleViewMore}>View More</button>
      </div>
    </div>
  );
}
