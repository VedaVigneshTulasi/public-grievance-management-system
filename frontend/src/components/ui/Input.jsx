const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {

  return (
    <div>

      <label className="block mb-2 font-medium text-gray-700">

        {label}

      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B2E59]"
      />

    </div>
  );
};

export default Input;