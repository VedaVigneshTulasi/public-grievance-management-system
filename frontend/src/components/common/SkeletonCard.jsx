const SkeletonCard = () => {

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">

      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>

      <div className="h-4 bg-gray-200 rounded mb-2"></div>

      <div className="h-4 bg-gray-200 rounded mb-2"></div>

      <div className="h-4 bg-gray-200 rounded w-3/4"></div>

    </div>
  );
};

export default SkeletonCard;