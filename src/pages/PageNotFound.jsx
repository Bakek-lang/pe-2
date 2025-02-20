import { Link } from "react-router-dom";

export default function PageNotFound() {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-center p-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <span className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Return Home
        </span>
      </Link>
    </div>
  );
}
