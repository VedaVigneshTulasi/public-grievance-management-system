import {
  ArrowUpRight,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  color = "text-blue-600",
  icon,
  subtitle = "Updated recently",
}) => {

  return (

    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      bg-white
      border
      border-slate-200
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-6
      "
    >

      {/* Background Shape */}
{/* 
      <div
        className="
        absolute
        -right-8
        -top-8
        w-24
        h-24
        rounded-full
        bg-slate-100
        "
      /> */}

      <div className="flex justify-between items-center">

        <div>

          <p
            className="
            text-sm
            font-medium
            text-slate-500
            "
          >
            {title}
          </p>

          <h2
            className={`
            text-4xl
            font-bold
            mt-3
            ${color}
            `}
          >
            {value}
          </h2>

          <p
            className="
            text-xs
            text-slate-400
            mt-2
            "
          >
            {subtitle}
          </p>

        </div>

       <div
  className="
  w-14
  h-14
  rounded-xl
  bg-blue-50
  flex
  items-center
  justify-center
  text-[#0B2E59]
  "
>
  {icon}
</div>

      </div>

      <div
        className="
        flex
        items-center
        gap-2
        mt-5
        text-green-600
        text-sm
        font-medium
        "
      >

        <ArrowUpRight size={16} />

        Active Monitoring

      </div>

    </div>

  );

};

export default StatCard;