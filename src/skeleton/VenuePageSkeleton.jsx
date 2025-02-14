export default function VenuePageSkeleton() {
  return (
    <div className="flex flex-col p-4 md:flex-row justify-center animate-pulse ">
      {/* Left Side: Media Gallery */}
      <div className="media-gallery flex flex-col md:w-1/2">
        {/* Main Image Placeholder */}
        <div className="w-full h-96 overflow-hidden bg-gray-300 rounded-t-lg" />
        {/* Thumbnails Placeholder */}
        <div className="w-full">
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded cursor-pointer border border-gray-300 bg-gray-300
                   h-20 w-1/4"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Venue Details */}
      <div className="ml-8 flex-1">
        {/* Owner and Rating */}
        <div className="flex justify-between items-center">
          <div className="mt-2 flex items-center gap-3">
            {/* Owner Avatar Placeholder */}
            <div className="h-8 w-8 rounded-full bg-gray-300" />
            {/* Owner Name Placeholder */}
            <div className="h-4 w-32 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center mt-1">
            {/* Rating Value Placeholder */}
            <div className="h-4 w-8 bg-gray-300 rounded" />
            {/* Star Icon Placeholder */}
            <div className="ml-0.5 h-4 w-4 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* Location Placeholder */}
        <div className="mt-2">
          <div className="h-4 w-48 bg-gray-300 rounded" />
        </div>

        {/* Venue Name Placeholder */}
        <div className="mt-4">
          <div className="h-6 w-64 bg-gray-300 rounded" />
        </div>

        {/* Description Placeholders */}
        <div className="mt-2 space-y-2">
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
        </div>

        {/* Max Guests */}
        <div className="flex items-center mt-4">
          <div className="h-10 w-10 bg-gray-300 rounded" />
          <div className="ml-1 h-4 w-32 bg-gray-300 rounded" />
        </div>

        {/* Price */}
        <div className="flex items-center mt-4">
          <div className="h-10 w-10 bg-gray-300 rounded" />
          <div className="ml-1 h-4 w-32 bg-gray-300 rounded" />
        </div>

        {/* Features */}
        <div className="mt-4">
          <div className="flex justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-8 w-16 bg-gray-300 rounded" />
            ))}
          </div>
        </div>

        {/* Booking Calendar Placeholder */}
        <div className="mt-10 w-full flex justify-start">
          <div className="h-64 w-full bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
