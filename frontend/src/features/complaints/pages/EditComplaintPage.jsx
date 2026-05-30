import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";

import {
  getComplaintById,
  updateComplaint,
} from "../services/complaintService";

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
    <div>
      <PageHeader
        title="Edit Complaint"
        subtitle="Update your complaint details"
      />

      <Card className="p-8">
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >
          <input
            type="text"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            placeholder="Complaint Title"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="5"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            placeholder="Description"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="department"
            value={
              formData.department
            }
            onChange={
              handleChange
            }
            placeholder="Department"
            className="w-full border rounded-lg p-3"
          />

          <select
            name="priority"
            value={
              formData.priority
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
          >
            <option>
              Low
            </option>

            <option>
              Medium
            </option>

            <option>
              High
            </option>

            <option>
              Critical
            </option>
          </select>

          <input
            type="text"
            name="location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            placeholder="Location"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="bg-[#0B2E59] text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Updating..."
              : "Update Complaint"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default EditComplaintPage;