import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Something went wrong. We couldn't process your request.
        </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
