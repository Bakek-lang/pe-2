export default function VenueCardSkeleton() {
  return (
    <div className="rounded-lg shadow-lg m-4 pb-4 flex flex-col max-w-sm h-lg w-96 animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-60 bg-gray-300 rounded-t-lg" />

      <div className="p-2">
        {/* Location Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>

        {/* Title & Rating Placeholder */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
          <div className="flex items-center">
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            <div className="ml-1 h-4 w-6 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Description Placeholder */}
        <div className="h-4 bg-gray-300 rounded mb-2"></div>

        {/* Max Guests & Price Placeholders */}
        <div className="flex items-center mb-2">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="ml-1 h-4 w-20 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center mb-2">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="ml-1 h-4 w-20 bg-gray-300 rounded"></div>
        </div>

        {/* Features Placeholder */}
        <div className="flex justify-between">
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
