import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import { fetchVenues } from "../js/utils/api";
import SearchBar from "../components/SearchBar";

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

      setVenues((prev) => {
        const existingIds = new Set(prev.map((v) => v.id));
        const filteredNewVenues = venuesWithImages.filter(
          (v) => !existingIds.has(v.id)
        );
        return [...prev, ...filteredNewVenues];
      });

      /*       setVenues((prev) => [...prev, ...venuesWithImages]); */
    }
    loadVenues();
  }, [page]);

  function handleViewMore() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div>
      <SearchBar venues={venues} />
      <div className="flex flex-wrap justify-center gap-4 p-4 flex-col items-center">
        {venues.map((venue, index) => (
          <VenueCard venue={venue} key={`${venue.id}-${index}`} />
        ))}
        <button
          onClick={handleViewMore}
          className="px-3 py-2 bg-blue-500 rounded-lg text-white"
        >
          View More
        </button>
      </div>
    </div>
  );
}
