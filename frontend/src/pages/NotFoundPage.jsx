import { Link } from "react-router-dom";

const NotFoundPage = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fa]">

      <h1 className="text-7xl font-bold text-[#0b2e59]">
        404
      </h1>

      <p className="text-gray-600 mt-4">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 bg-[#0b2e59] text-white px-6 py-3 rounded"
      >
        Go Home
      </Link>

    </div>
  );
};

export default NotFoundPage;