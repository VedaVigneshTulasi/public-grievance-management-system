import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { getNotifications, markAsRead } from "../../features/notifications/services/notificationService";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-96 rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="rounded-t-3xl bg-[#0B2E59] px-6 py-4 text-white">
            <p className="text-sm font-semibold">Notifications</p>
            <p className="text-xs text-slate-200">Latest government updates and complaint alerts</p>
          </div>
          <div className="max-h-96 space-y-2 overflow-y-auto p-4">
            {notifications.length === 0 ? (
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">No new notifications</div>
            ) : (
              notifications.map((item) => (
                <div key={item._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                    </div>
                    {!item.isRead && <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">New</span>}
                  </div>
                  {!item.isRead && (
                    <button
                      onClick={() => handleRead(item._id)}
                      className="mt-3 inline-flex rounded-2xl bg-[#123D82] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0B2E59]"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;