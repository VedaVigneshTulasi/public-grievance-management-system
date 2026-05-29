
import { useState } from "react";

import {
  createComplaintApi,
} from "../services/complaintService";

const ComplaintForm = () => {

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      department: "",
      priority: "Medium",
      location: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createComplaintApi(
        formData
      );

      alert(
        "Complaint submitted successfully"
      );

      setFormData({
        title: "",
        description: "",
        department: "",
        priority: "Medium",
        location: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed to submit complaint");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
    >

      <h2 className="text-2xl font-bold text-[#0b2e59] mb-6">
        Lodge Complaint
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Complaint Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full border border-gray-300 p-3 rounded"
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded"
        >

          <option value="">
            Select Department
          </option>

          <option value="Roads">
            Roads
          </option>

          <option value="Water Supply">
            Water Supply
          </option>

          <option value="Electricity">
            Electricity
          </option>

          <option value="Sanitation">
            Sanitation
          </option>

        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded"
        >

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

          <option value="Critical">
            Critical
          </option>

        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded"
        />

        <button
          type="submit"
          className="bg-[#0b2e59] hover:bg-[#163d73] text-white px-6 py-3 rounded"
        >
          Submit Complaint
        </button>

      </div>

    </form>
  );
};

export default ComplaintForm;