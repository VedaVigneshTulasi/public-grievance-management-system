const StatCard = ({
  title,
  value,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">

      <h3 className="text-gray-500 text-sm font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold text-[#0b2e59] mt-2">
        {value}
      </p>

    </div>
  );
};

export default StatCard;