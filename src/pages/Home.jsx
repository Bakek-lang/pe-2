import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import { fetchVenues } from "../js/API/api";
import SearchBar from "../components/SearchBar";
import { isValidUrl } from "../js/utils/isValidUrl";
import VenueCardSkeleton from "../skeleton/VenueCardSkeleton";

export default function Home() {
  useEffect(() => {
    document.title = "Home | Holidaze";
  }, []);

  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadVenues() {
      const newVenues = await fetchVenues(30, page);

      const venuesWithImages = newVenues.filter(
        (venue) =>
          venue.media &&
          venue.media.length > 0 &&
          isValidUrl(venue.media[0].url)
      );

      setVenues((prev) => {
        const existingIds = new Set(prev.map((v) => v.id));
        const filteredNewVenues = venuesWithImages.filter(
          (v) => !existingIds.has(v.id)
        );
        return [...prev, ...filteredNewVenues];
      });
      setIsLoading(false);
    }
    loadVenues();
  }, [page]);

  function handleViewMore() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div>
      <SearchBar />
      <div className="flex flex-wrap justify-center   items-stretch gap-y-8 ">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <VenueCardSkeleton key={index} />
            ))
          : venues.map((venue, index) => (
              <VenueCard venue={venue} key={`${venue.id}-${index}`} />
            ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleViewMore}
          className="px-3 py-2 bg-blue-500 rounded-lg text-white mb-4"
        >
          View More
        </button>
      </div>
    </div>
  );
}
