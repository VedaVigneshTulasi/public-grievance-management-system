const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search complaints, departments or priorities"
      className="w-full md:w-96 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-[#123D82] focus:ring-2 focus:ring-[#123D82]/20"
    />
  );
};

export default SearchBar;