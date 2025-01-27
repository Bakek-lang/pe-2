import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ venues }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVenues, setFilteredVenues] = useState([]);
  const navigate = useNavigate();

  function handleSearchChange(event) {
    const input = event.target.value;
    setSearchTerm(input);

    const newFilteredVenues = venues.filter((venue) => {
      return venue.name
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(input.toLowerCase()));
    });

    console.log("Filtered venues: ", newFilteredVenues);
    console.log("venues only", venues);

    setFilteredVenues(newFilteredVenues);
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
        {searchTerm && (
          <ul className="absolute bg-white w-full border rounded z-10">
            {filteredVenues.map((venue) => (
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
                  <h2 className="ml-2">{venue.name}</h2>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
