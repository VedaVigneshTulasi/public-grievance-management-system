import { useEffect, useState } from "react";
import { Trash2, Edit2, Plus, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader.jsx";
import { getAllUsers, deleteUser, updateUserRole } from "../services/adminService";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users || []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
        loadUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleUpdateRole = async () => {
    try {
      await updateUserRole(selectedUser._id, newRole);
      toast.success("User role updated successfully");
      setShowModal(false);
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const userStats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    superadmins: users.filter((u) => u.role === "superadmin").length,
    citizens: users.filter((u) => u.role === "citizen").length,
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Manage system users and their roles"
      />

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <h3 className="text-gray-600 text-sm font-semibold">Total Users</h3>
          <p className="text-3xl font-bold text-blue-700 mt-2">{userStats.total}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <h3 className="text-gray-600 text-sm font-semibold">Super Admins</h3>
          <p className="text-3xl font-bold text-purple-700 mt-2">{userStats.superadmins}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
          <h3 className="text-gray-600 text-sm font-semibold">Admins</h3>
          <p className="text-3xl font-bold text-orange-700 mt-2">{userStats.admins}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <h3 className="text-gray-600 text-sm font-semibold">Citizens</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">{userStats.citizens}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <Filter size={20} className="text-gray-400 mt-2" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Roles</option>
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-300">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Joined</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-sm text-slate-800 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "superadmin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "admin"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{user.department || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setNewRole(user.role);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit role"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found matching your criteria
          </div>
        )}
      </Card>

      {/* Edit Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Update User Role</h2>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">User: {selectedUser?.name}</p>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="citizen">Citizen</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Update Role
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
