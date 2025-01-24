import { FaWifi, FaParking, FaDog, FaUtensils, FaStar } from "react-icons/fa";

const featuresInfo = {
  wifi: { label: "Wifi", Icon: FaWifi },
  breakfast: { label: "Breakfast", Icon: FaUtensils },
  parking: { label: "Parking", Icon: FaParking },
  pets: { label: "Pets", Icon: FaDog },
};

export default function VenueCard({ venue }) {
  function renderFeatures() {
    return Object.keys(featuresInfo).map((key) => {
      if (venue.meta[key]) {
        const { Icon, label } = featuresInfo[key];
        return (
          <p key={key}>
            <Icon /> {label}
          </p>
        );
      }
      return null;
    });
  }

  return (
    <div className="rounded-lg shadow-lg max-w-sm m-4 pb-4 flex flex-col">
      <img
        src={venue.media[0].url}
        alt="/"
        className="w-48 h-full object-cover rounded-t-lg"
      />
      <div className="p-2">
        <p className=" text-gray-500">
          {venue.location.city}, {venue.location.country}
        </p>
        <div className="flex justify-between ">
          <h2 className="text-xl">{venue.name}</h2>
          <div className="flex justify-center items-center">
            <FaStar />
            <p className="ml-0.5">{venue.rating}</p>
          </div>
        </div>
        <p>{venue.description}</p>
        <p>Max Guests: {venue.maxGuests}</p>
        <p>{venue.price} NOK per night</p>
        <div className="flex justify-between mt-4">{renderFeatures()}</div>
      </div>
    </div>
  );
}
