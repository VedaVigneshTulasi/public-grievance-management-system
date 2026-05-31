const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  autoComplete = "off",
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-3xl border px-4 py-3 text-slate-700 shadow-sm transition duration-200 outline-none focus:ring-2 focus:ring-[#123D82]/20 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-slate-300 focus:border-[#123D82]"
        }`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;