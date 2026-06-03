import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/common/PageHeader";
import { createComplaint } from "../services/complaintService";

const CreateComplaintPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    priority: "Medium",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createComplaint(formData);
      toast.success(response.message);
      setFormData({ title: "", description: "", department: "", priority: "Medium", location: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Lodge Complaint" subtitle="Submit a grievance to the concerned department" />
      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
        <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Complaint Title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter complaint title" />
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Description</label>
              <textarea
                rows="6"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-700 shadow-sm focus:border-[#0B2E59] focus:outline-none focus:ring-2 focus:ring-[#0B2E59]/20"
                placeholder="Describe your complaint"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-sm text-slate-700 shadow-sm focus:border-[#0B2E59] focus:outline-none focus:ring-2 focus:ring-[#0B2E59]/20"
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
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-sm text-slate-700 shadow-sm focus:border-[#0B2E59] focus:outline-none focus:ring-2 focus:ring-[#0B2E59]/20"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
            <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Enter complaint location" />
            <Button type="submit">{loading ? "Submitting..." : "Submit Complaint"}</Button>
          </form>
        </Card>
        <Card className="rounded-[32px] border border-slate-200 p-8 shadow-sm bg-[#F8FAFC]">
          <h2 className="text-2xl font-semibold text-[#0B2E59]">Need help submitting?</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Provide an accurate title, clear description, and exact location to help the department process your grievance quickly.
          </p>
          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Step 1</p>
              <p className="mt-2">Choose the correct department for your issue.</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Step 2</p>
              <p className="mt-2">Describe your grievance with key facts and dates.</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="font-semibold">Step 3</p>
              <p className="mt-2">Submit the complaint once the details are complete.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateComplaintPage;
