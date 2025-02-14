export default function UserProfileSkeleton() {
  return (
    <div className="border border-gray-300 flex flex-col items-center shadow-md rounded-lg w-1/3 self-start p-6 animate-pulse">
      {/* Avatar Placeholder */}
      <div className="h-28 w-28 rounded-full bg-gray-300 border border-blue-400" />

      {/* Name Placeholder */}
      <div className="h-8 w-40 bg-gray-300 rounded mt-4"></div>

      {/* Bio Placeholder */}
      <div className="h-4 w-56 bg-gray-300 rounded mt-2"></div>
      <div className="h-4 w-44 bg-gray-300 rounded mt-2"></div>

      {/* Venue Manager Placeholder */}
      <div className="flex items-center mt-4">
        <div className="h-4 w-24 bg-gray-300 rounded mr-2"></div>
        <div className="h-7 w-7 bg-gray-300 rounded-full"></div>
      </div>

      {/* Button Placeholder */}
      <div className="h-10 w-36 bg-gray-300 rounded mt-4"></div>
    </div>
  );
}
