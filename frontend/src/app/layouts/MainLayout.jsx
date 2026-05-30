import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-[#0B2E59] text-white shadow">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-xl font-bold">
            Public Grievance Management System
          </h1>

          <div className="text-sm">
            Government Citizen Portal
          </div>

        </div>

      </header>

      {/* Content */}

      <main>

        <Outlet />

      </main>

      {/* Footer */}

      <footer className="bg-[#0B2E59] text-white mt-20">

        <div className="max-w-7xl mx-auto px-6 py-6 text-center">

          © 2026 Public Grievance Management System

        </div>

      </footer>

    </div>
  );
};

export default MainLayout;