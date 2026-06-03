import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Users, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader.jsx";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/adminService";

const DepartmentManagementPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", email: "", phone: "", head: "" });

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data.departments || []);
    } catch (error) {
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (dept = null) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({
        name: dept.name,
        description: dept.description || "",
        email: dept.email || "",
        phone: dept.phone || "",
        head: dept.head || "",
      });
    } else {
      setEditingDept(null);
      setFormData({ name: "", description: "", email: "", phone: "", head: "" });
    }
    setShowModal(true);
  };

  const handleSaveDepartment = async () => {
    if (!formData.name.trim()) {
      toast.error("Department name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Department email is required");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Department phone is required");
      return;
    }

    try {
      if (editingDept) {
        await updateDepartment(editingDept._id, formData);
        toast.success("Department updated successfully");
      } else {
        await createDepartment(formData);
        toast.success("Department created successfully");
      }
      setShowModal(false);
      loadDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save department");
    }
  };

  const handleDeleteDepartment = async (deptId) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(deptId);
        toast.success("Department deleted successfully");
        loadDepartments();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete department");
      }
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  // Calculate stats
  const totalDepartments = departments.length;
  const avgComplaints = departments.length > 0
    ? Math.round(departments.reduce((sum, d) => sum + (d.complaintCount || 0), 0) / departments.length)
    : 0;

  return (
    <div>
      <PageHeader
        title="Department Management"
        subtitle="Manage departments and their operations"
      />

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <h3 className="text-gray-600 text-sm font-semibold">Total Departments</h3>
          <p className="text-3xl font-bold text-blue-700 mt-2">{totalDepartments}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
          <h3 className="text-gray-600 text-sm font-semibold">Avg Complaints/Dept</h3>
          <p className="text-3xl font-bold text-orange-700 mt-2">{avgComplaints}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <h3 className="text-gray-600 text-sm font-semibold">Active Departments</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">{departments.filter(d => d.isActive !== false).length}</p>
        </Card>
      </div>

      {/* Add Department Button */}
      <div className="mb-8">
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          <Plus size={20} />
          Add Department
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {departments.map((dept) => (
          <Card
            key={dept._id}
            className="p-6 hover:shadow-lg transition border-l-4 border-blue-600"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">{dept.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(dept)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeleteDepartment(dept._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              {dept.description || "No description provided"}
            </p>

            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Complaints</span>
                <span className="font-bold text-blue-700">{dept.complaintCount || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Staff Members</span>
                <span className="font-bold text-orange-700">{dept.staffCount || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Status</span>
                <span
                  className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                    dept.isActive !== false
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {dept.isActive !== false ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {departments.length === 0 && (
        <Card className="p-12 text-center">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No departments found</p>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            Create First Department
          </button>
        </Card>
      )}

      {/* Department Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              {editingDept ? "Edit Department" : "Add New Department"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Roads & Infrastructure"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter department description..."
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="department@example.gov"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="1800-000-000"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Head</label>
                <input
                  type="text"
                  value={formData.head}
                  onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                  placeholder="Head Name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDepartment}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {editingDept ? "Update" : "Create"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagementPage;
