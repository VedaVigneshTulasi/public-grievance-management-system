import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      title: "Lodge Complaint",
      icon: <FileText size={18} />,
      path: "/complaints/create",
    },
    {
      title: "My Complaints",
      icon: <FileText size={18} />,
      path: "/complaints",
    },

    {
      title: "Activity Logs",
      path: "/activity-logs",
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}

      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#0B2E59] text-white p-2 rounded"
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-[#0B2E59] text-white z-40 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="p-6 border-b border-blue-900">
          <h1 className="text-xl font-bold">PGMS</h1>

          <p className="text-sm text-gray-300 mt-1">Citizen Services Portal</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${isActive ? "bg-blue-800" : "hover:bg-blue-800"}`
              }
            >
              {item.icon}

              {item.title}
            </NavLink>
          ))}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800"
            >
              <ShieldCheck size={18} />
              Admin Dashboard
            </NavLink>
          )}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-blue-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
