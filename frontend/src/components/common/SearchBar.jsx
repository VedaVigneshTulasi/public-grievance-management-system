const SearchBar = ({
  value,
  onChange,
}) => {
 
  return (
<input
      type="text"
      placeholder="Search complaints..."
      value={value}
      onChange={onChange}
      className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-3"
    />
  );
};
 
export default SearchBar;