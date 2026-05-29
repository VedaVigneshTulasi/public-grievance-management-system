import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header className="bg-[#0b2e59] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Public Grievance Portal</h1>

          <p className="text-sm text-gray-200">
            Government Complaint Management System
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{user?.user?.name}</p>

            <p className="text-sm text-gray-200 capitalize">
              {user?.user?.role}
            </p>
          </div>

          <button
            onClick={() => navigate("/create-complaint")}
            className="bg-white text-[#0b2e59] px-4 py-2 rounded font-semibold"
          >
            Lodge Complaint
          </button>

          <button
            onClick={() => navigate("/complaints")}
            className="bg-white text-[#0b2e59] px-4 py-2 rounded font-semibold"
          >
            My Complaints
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
