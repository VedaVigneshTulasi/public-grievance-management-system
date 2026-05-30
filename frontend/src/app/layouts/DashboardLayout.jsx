import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

const DashboardLayout = () => {

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Content */}

      <div className="lg:ml-72">

        {/* Top Header */}

        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">

          <div className="px-6 py-4 flex justify-between items-center">

            <h2 className="text-2xl font-semibold text-[#0B2E59]">
              Public Grievance Management
            </h2>

            <div className="font-medium text-gray-700">

              Citizen Services Portal

            </div>

          </div>

        </header>

        {/* Page Content */}

        <main className="p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;