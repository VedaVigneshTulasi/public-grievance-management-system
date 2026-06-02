import { Outlet, useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Bell, LogOut, User } from "lucide-react";

import Sidebar from "../../components/common/Sidebar";
import NotificationBell from "../../components/common/NotificationBell";

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageMap = {
    "/dashboard": "Dashboard",
    "/complaints": "My Complaints",
    "/complaints/create": "Lodge Complaint",
    "/complaints/:id": "Complaint Details",
    "/complaints/edit/:id": "Edit Complaint",
    "/track": "Track Complaint",
    "/admin": "Admin Dashboard",
    "/activity-logs": "Activity Logs",
    "/profile": "My Profile",
  };

  const normalizedPath = location.pathname
    .replace(/\/complaints\/edit\/[A-Za-z0-9_-]+$/, "/complaints/edit/:id")
    .replace(/\/complaints\/[A-Za-z0-9_-]+$/, "/complaints/:id");

  const pageTitle = pageMap[normalizedPath] || "Dashboard";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const portalLabel = location.pathname.startsWith("/admin") ? "Admin Portal" : "Government Portal";

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <div className="lg:ml-72 min-w-0 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-sm">
          <div className="px-4 py-4 lg:px-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {today}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-2xl font-bold text-[#0B2E59]">{pageTitle}</p>
                {!location.pathname.startsWith("/admin") && (
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-sm">
                    {portalLabel}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-end">
              <NotificationBell />

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-2 shadow-sm"
                >
                  <div className="h-11 w-11 rounded-full bg-[#0B2E59] text-white flex items-center justify-center shadow">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{user?.name || "Citizen"}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{user?.role || "User"}</p>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border border-slate-200 z-50">
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

