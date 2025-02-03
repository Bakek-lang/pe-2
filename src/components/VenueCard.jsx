import { FaStar, FaUsers, FaMoneyBillAlt } from "react-icons/fa";
import { shortenText } from "../js/utils/shortenText";
import { Link } from "react-router-dom";
import { renderFeatures } from "../js/utils/features";
import { shortenTitle } from "../js/utils/shortenTitle";

export default function VenueCard({ venue }) {
  return (
    <Link to={`venue/${venue.id}`}>
      <div className="rounded-lg shadow-lg max-w-sm m-4 pb-4 flex flex-col">
        <img
          src={venue.media[0].url}
          alt="/"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="p-2">
          <p className=" text-gray-500">
            {venue.location.city}, {venue.location.country}
          </p>
          <div className="flex justify-between ">
            <h2 className="text-xl font-bold">
              {shortenTitle(venue.name, 15)}
            </h2>
            <div className="flex justify-center items-center">
              <FaStar />
              <p className="ml-0.5">{venue.rating}</p>
            </div>
          </div>
          <p>{shortenText(venue.description, 20)}</p>
          <div className="flex items-center mt-2">
            <FaUsers className="text-2xl" />
            <p className="ml-1">Max Guests: {venue.maxGuests}</p>
          </div>
          <div className="flex items-center">
            <FaMoneyBillAlt className="text-2xl" />
            <p className="ml-1">{venue.price} NOK per night</p>
          </div>
          <div className="flex justify-between mt-4">
            {renderFeatures(venue)}
          </div>
        </div>
      </div>
    </Link>
  );
}
