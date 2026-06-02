import { useState } from "react";
import { NavLink } from "react-router-dom";
import indiaEmblem from "../../assets/logo/indiaEmblem.jpg";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Search,
  Menu,
  X,
  User,
  Users,
  Building2,
  BarChart3,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

const citizenMenu = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
    exact: true,
  },
  {
    title: "Lodge Complaint",
    icon: <FileText size={20} />,
    path: "/complaints/create",
    exact: true,
  },
  {
    title: "My Complaints",
    icon: <FileText size={20} />,
    path: "/complaints",
    exact: true,
  },
  {
    title: "Track Complaint",
    icon: <Search size={20} />,
    path: "/track",
    exact: true,
  },
  {
    title: "My Profile",
    icon: <User size={20} />,
    path: "/profile",
    exact: true,
  },
];

  const adminMenu = [
    { title: "Admin Dashboard", icon: <ShieldCheck size={20} />, path: "/admin", exact: true },
    { title: "User Management", icon: <Users size={20} />, path: "/admin/users" },
    { title: "Department Management", icon: <Building2 size={20} />, path: "/admin/departments" },
    { title: "System Reports", icon: <BarChart3 size={20} />, path: "/admin/reports" },
    { title: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
    { title: "Activity Logs", icon: <FileText size={20} />, path: "/activity-logs" },
  ];

  const menuItems = user?.role === "admin" ? adminMenu : citizenMenu;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-white text-[#0B2E59] shadow-lg"
      >
        {open ? <X /> : <Menu />}
      </button>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" />}

      <aside className={`fixed top-0 left-0 h-screen w-72 bg-[#0B2E59] text-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-40`}>
        <div className="px-6 pt-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-inner">
              <img src={indiaEmblem} alt="Indian Emblem" className="h-12 w-12 rounded-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PGMS</h1>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200">{user?.role === "admin" ? "Admin Portal" : "Citizen Portal"}</p>
            </div>
          </div>
        </div>

        {/* Sidebar profile removed to avoid duplicate with top navbar profile */}

        <nav className="px-4 pb-6 mt-6 space-y-2">
          {menuItems.map((item) => (
         <NavLink
  key={item.path}
  to={item.path}
  end={item.exact}
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-white text-[#0B2E59] shadow-lg"
        : "text-slate-200 hover:bg-white/10 hover:text-white"
    }`
  }
>
  {item.icon}
  {item.title}
</NavLink>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-6">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-3 text-xs text-slate-200 shadow-sm overflow-hidden">
            <p className="font-semibold text-white truncate">Public Grievance Management</p>
            <p className="mt-1 text-slate-300 leading-tight break-words">Government service delivery that is secure, transparent and citizen-centric.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
