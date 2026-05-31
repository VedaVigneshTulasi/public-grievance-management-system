const Button = ({ children, type = "button", onClick, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-3xl px-5 py-3 text-sm font-semibold text-white transition duration-200 ${
        disabled
          ? "cursor-not-allowed bg-slate-300 text-slate-700"
          : "bg-[#0B2E59] hover:bg-[#123D82]"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;