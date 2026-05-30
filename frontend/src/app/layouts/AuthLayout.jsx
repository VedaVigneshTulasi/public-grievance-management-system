import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">

      <div className="min-h-screen flex items-center justify-center px-4">

        <div className="w-full max-w-md">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-[#0B2E59]">
              PGMS
            </h1>

            <p className="text-gray-600 mt-2">
              Public Grievance Management System
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <Outlet />

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;