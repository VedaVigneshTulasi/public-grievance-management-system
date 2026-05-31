import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/common/PageHeader";
import { getComplaintById, updateComplaint } from "../services/complaintService";

const EditComplaintPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      department: "",
      priority: "Medium",
      location: "",
    });

  useEffect(() => {
    loadComplaint();
  }, []);

  const loadComplaint = async () => {
    try {
      const data =
        await getComplaintById(id);

      const complaint =
        data.complaint;

      setFormData({
        title:
          complaint.title || "",

        description:
          complaint.description || "",

        department:
          complaint.department || "",

        priority:
          complaint.priority || "Medium",

        location:
          complaint.location || "",
      });
    } catch (error) {
      toast.error(
        "Failed to load complaint"
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateComplaint(
        id,
        formData
      );

      toast.success(
        "Complaint Updated Successfully"
      );

      navigate(
        `/complaints/${id}`
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed To Update Complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Complaint" subtitle="Update your grievance details and keep departments informed." />
      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
        <Card className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Complaint Title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter complaint title" />
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Description</label>
              <textarea
                rows="6"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide an updated description"
                className="w-full rounded-3xl border border-slate-300 bg-white p-4 text-sm text-slate-700 shadow-sm focus:border-[#0B2E59] focus:outline-none focus:ring-2 focus:ring-[#0B2E59]/20"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-[#0B2E59] focus:outline-none focus:ring-2 focus:ring-[#0B2E59]/20"
                >
                  <option value="">Select Department</option>
                  <option>Water Supply</option>
                  <option>Roads</option>
                  <option>Electricity</option>
                  <option>Sanitation</option>
                  <option>Public Safety</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-[#0B2E59] focus:outline-none focus:ring-2 focus:ring-[#0B2E59]/20"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
            <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Enter complaint location" />
            <Button type="submit">{loading ? "Updating..." : "Update Complaint"}</Button>
          </form>
        </Card>

        <Card className="rounded-[32px] border border-slate-200 bg-[#F8FAFC] p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-[#0B2E59]">Update Guidance</h2>
          <p className="mt-4 text-slate-600 leading-7">Make sure the complaint details remain accurate and helpful to speed up resolution.</p>
          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Select the correct department</p>
              <p className="mt-2">Choose the department best suited to resolve your issue.</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Provide clear updates</p>
              <p className="mt-2">Use easy-to-understand language and include relevant information.</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Review before saving</p>
              <p className="mt-2">Verify all fields before submitting so officials can act promptly.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditComplaintPage;