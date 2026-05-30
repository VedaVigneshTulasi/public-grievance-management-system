import { Bell } from "lucide-react";

const NotificationBell = ({
  count,
}) => {
  return (
    <div className="relative">

      <Bell size={24} />

      {count > 0 && (

        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">

          {count}

        </span>

      )}

    </div>
  );
};

export default NotificationBell;