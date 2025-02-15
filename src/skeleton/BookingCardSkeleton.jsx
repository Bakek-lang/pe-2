export default function BookingCardSkeleton() {
  return (
    <div className="rounded-lg shadow-lg m-4 pb-4 flex flex-col max-w-sm h-lg w-96 animate-pulse">
      {/* Skeleton image */}
      <div className="w-full h-60 bg-gray-300 rounded-t-lg"></div>
      <div className="p-2">
        {/* Top section with title and rating */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          <div className="flex items-center space-x-1">
            {/* Simulating an icon */}
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            {/* Simulating the rating text */}
            <div className="h-4 w-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        {/* Date and guests info */}
        <div className="flex flex-col space-y-2 mb-4">
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
        </div>
        {/* Delete button placeholder */}
        <div className="flex justify-end">
          <div className="h-8 w-24 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
