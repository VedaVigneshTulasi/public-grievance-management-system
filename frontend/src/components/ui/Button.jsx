const Button = ({
  children,
  type = "button",
  onClick,
}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-[#0B2E59] hover:bg-blue-900 text-white py-3 rounded-lg font-semibold transition"
    >

      {children}

    </button>
  );
};

export default Button;