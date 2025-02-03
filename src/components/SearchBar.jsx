import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shortenTitle } from "../js/utils/shortenTitle";
import {
  API_BASE,
  API_HOLIDAZE,
  API_SEARCH,
  API_VENUES,
} from "../js/API/constants";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  async function fetchAllVenues(query) {
    let allVenues = [];
    let currentPage = 1;
    let pageCount = 1;

    try {
      do {
        const response = await fetch(
          API_BASE + API_HOLIDAZE + API_VENUES + API_SEARCH + `?q=${query}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();

        const venuesWithImages = data.data.filter(
          (venue) => venue.media && venue.media.length > 0
        );

        allVenues = allVenues.concat(venuesWithImages);

        console.log("ALL VENUES:", allVenues);

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
    setVenues(allVenues);
  }
  return (
    <div className="flex justify-center mt-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
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
                  />
                  <h2 className="ml-2">{shortenTitle(venue.name, 14)}</h2>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
