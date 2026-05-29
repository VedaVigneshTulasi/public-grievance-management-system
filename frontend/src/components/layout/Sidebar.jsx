import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  LogOut,
  Menu,
} from "lucide-react";

import {
  useContext,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../../context/AuthContext";

const Sidebar = () => {

  const navigate = useNavigate();

  const { user, logout } =
    useContext(AuthContext);

  const [open, setOpen] =
    useState(false);

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <>

      {/* Mobile Menu Button */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#0b2e59] text-white p-2 rounded"
      >

        <Menu size={24} />

      </button>

      {/* Mobile Overlay */}

      {
        open && (
          <div
            onClick={() =>
              setOpen(false)
            }
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )
      }

      {/* Sidebar */}

      <aside
        className={`fixed top-0 left-0 min-h-screen w-72 bg-[#0b2e59] text-white p-6 z-40 transform transition-transform duration-300
        ${open
          ? "translate-x-0"
          : "-translate-x-full"
        }
        lg:translate-x-0`}
      >

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-2xl font-bold">
            Grievance Portal
          </h1>

          <p className="text-gray-300 text-sm mt-1">
            Government Management System
          </p>

        </div>

        {/* Navigation */}

        <nav className="space-y-3">

          <button
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full hover:bg-[#163d73] px-4 py-3 rounded"
          >

            <LayoutDashboard />

            Dashboard

          </button>

          <button
            onClick={() => {
              navigate("/complaints");
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full hover:bg-[#163d73] px-4 py-3 rounded"
          >

            <FileText />

            My Complaints

          </button>

          <button
            onClick={() => {
              navigate("/create-complaint");
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full hover:bg-[#163d73] px-4 py-3 rounded"
          >

            <FileText />

            Lodge Complaint

          </button>

          {
            user?.user?.role ===
              "admin" && (

              <button
                onClick={() => {
                  navigate("/admin");
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full hover:bg-[#163d73] px-4 py-3 rounded"
              >

                <ShieldCheck />

                Admin Dashboard

              </button>
            )
          }

        </nav>

        {/* Footer */}

        <div className="absolute bottom-8 left-6 right-6">

          <div className="border-t border-gray-500 pt-4">

            <div className="mb-4">

              <p className="font-semibold">
                {user?.user?.name}
              </p>

              <p className="text-sm text-gray-300 capitalize">
                {user?.user?.role}
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded"
            >

              <LogOut />

              Logout

            </button>

          </div>

        </div>

      </aside>

    </>
  );
};

export default Sidebar;