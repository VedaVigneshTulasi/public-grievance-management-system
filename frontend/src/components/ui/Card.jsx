const Card = ({
  children,
  className = "",
}) => {

  return (

    <div
      className={`
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        overflow-hidden
        ${className}
      `}
    >

      {children}

    </div>

  );

};

export default Card;