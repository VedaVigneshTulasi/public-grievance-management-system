import { Outlet } from "react-router-dom";
import { Bell, LogOut, User } from "lucide-react";

import Sidebar from "../../components/common/Sidebar";

const DashboardLayout = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="lg:ml-72">

        {/* Header */}

        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">

          <div className="px-6 py-4 flex justify-between items-center">

            {/* Left */}

            <div>

              <h2 className="text-2xl font-bold text-[#0B2E59]">

                Public Grievance Management System

              </h2>

              <p className="text-sm text-gray-500">

                Government Citizen Services Portal

              </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

              {/* Notification */}

              <div className="relative cursor-pointer">

                <Bell
                  size={24}
                  className="text-gray-700"
                />

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">

                  3

                </span>

              </div>

              {/* User */}

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-[#0B2E59] text-white flex items-center justify-center">

                  <User size={18} />

                </div>

                <div>

                  <p className="font-semibold">

                    {user?.name || "Citizen"}

                  </p>

                  <p className="text-xs text-gray-500">

                    {user?.role || "user"}

                  </p>

                </div>

              </div>

              {/* Logout */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >

                <LogOut size={16} />

                Logout

              </button>

            </div>

          </div>

        </header>

        {/* Main */}

        <main className="p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;