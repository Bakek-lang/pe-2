export default function VenueCard({ venue }) {
  return (
    <div className="rounded-lg shadow-lg max-w-sm  ">
      <img src="/" alt="/" className="w-48 h-full object-cover" />
      <div className="">
        <h2>{venue.name}</h2>
      </div>
    </div>
  );
}
