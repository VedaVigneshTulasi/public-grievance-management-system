import { useState } from "react";

import toast from "react-hot-toast";

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

      toast.success(
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

      toast.error(
        "Failed to submit complaint"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 shadow-sm"
    >

      <h2 className="text-2xl font-bold text-[#0b2e59] mb-6">
        Complaint Information
      </h2>

      <div className="space-y-5">

        {/* Title */}

        <div>

          <label className="block font-semibold mb-2">
            Complaint Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter complaint title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#0b2e59]"
            required
          />

        </div>

        {/* Description */}

        <div>

          <label className="block font-semibold mb-2">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Describe your complaint"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#0b2e59]"
            required
          />

        </div>

        {/* Department + Priority */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label className="block font-semibold mb-2">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#0b2e59]"
              required
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

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#0b2e59]"
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

          </div>

        </div>

        {/* Location */}

        <div>

          <label className="block font-semibold mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            placeholder="Enter complaint location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#0b2e59]"
            required
          />

        </div>

        {/* Submit Button */}

        <button
          type="submit"
          className="w-full bg-[#0b2e59] hover:bg-[#163d73] text-white font-semibold py-3 rounded-lg transition"
        >
          Submit Complaint
        </button>

      </div>

    </form>
  );
};

export default ComplaintForm;