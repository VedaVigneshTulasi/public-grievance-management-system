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
<nav className="bg-blue-600 text-white p-4 flex justify-between">
<h1 className="font-bold">

        Grievance System
</h1>
 
      <div className="flex gap-4 items-center">
<span>{user?.user?.name}</span>
 
        <button

          onClick={handleLogout}

          className="bg-red-500 px-3 py-1 rounded"
>

          Logout
</button>
</div>
</nav>

  );

};
 
export default Navbar;
 