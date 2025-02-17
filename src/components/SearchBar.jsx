import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shortenTitle } from "../js/utils/shortenTitle";
import {
  API_BASE,
  API_HOLIDAZE,
  API_SEARCH,
  API_VENUES,
} from "../js/API/constants";
import { isValidUrl } from "../js/utils/isValidUrl";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [venues, setVenues] = useState([]);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const navigate = useNavigate();

  async function fetchAllVenues(query) {
    let allVenues = [];
    let currentPage = 1;
    let pageCount = 1;

    try {
      do {
        const response = await fetch(
          API_BASE +
            API_HOLIDAZE +
            API_VENUES +
            API_SEARCH +
            `?q=${query}&page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();

        const venuesWithImages = data.data.filter(
          (venue) =>
            venue.media &&
            venue.media.length > 0 &&
            isValidUrl(venue.media[0].url)
        );

        allVenues = allVenues.concat(venuesWithImages);

        pageCount = data.meta.pageCount;
        currentPage++;
      } while (currentPage <= pageCount);
    } catch (error) {
      console.log("Error fetching all pages: ", error);
    }

    return allVenues;
  }

  async function handleSearchChange(event) {
    const input = event.target.value;
    setSearchTerm(input);

    if (input.trim() === "") {
      setVenues([]);
      return;
    }

    const allVenues = await fetchAllVenues(input);
    const limitedVenues = allVenues.slice(0, 8);
    setVenues(limitedVenues);

    setHasMoreResults(allVenues.length > 8);
  }
  return (
    <div className="flex justify-center mt-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-gray-400 p-2 rounded-lg"
        />
        {searchTerm && venues.length > 0 && (
          <ul className="absolute bg-white w-full border rounded z-10">
            {venues.map((venue) => (
              <li
                key={venue.id}
                className="p-2 cursor-pointer"
                onClick={() => navigate(`/venue/${venue.id}`)}
              >
                <div className="flex items-center">
                  <img
                    src={venue.media[0].url}
                    alt={venue.name}
                    className="w-10 h-10"
                    onError={(event) => {
                      event.target.onerror = null;
                      event.target.src = "https://placehold.co/600x400";
                    }}
                  />
                  <h2 className="ml-2">{shortenTitle(venue.name, 14)}</h2>
                </div>
              </li>
            ))}
            {hasMoreResults && (
              <li className="p-2 italic text-gray-500">
                More results available...
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
