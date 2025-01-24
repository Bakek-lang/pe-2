export default function VenueCard({ venue }) {
  return (
    <div className="rounded-lg shadow-lg max-w-sm m-4 pb-4 flex flex-col">
      <img
        src={venue.media[0].url}
        alt="/"
        className="w-48 h-full object-cover rounded-t-lg"
      />
      <div className="p-2">
        <p>
          {venue.location.city}, {venue.location.country}
        </p>
        <div className="flex justify-between ">
          <h2>{venue.name}</h2>
          <span>{venue.rating}</span>
        </div>
        <p>{venue.description}</p>
      </div>
    </div>
  );
}
