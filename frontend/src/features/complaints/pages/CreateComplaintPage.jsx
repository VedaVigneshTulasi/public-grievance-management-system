import { useState } from "react";
 
import toast from "react-hot-toast";
 
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
 
import PageHeader from "../../../components/common/PageHeader";
 
import {
  createComplaint,
} from "../services/complaintService";
 
const CreateComplaintPage = () => {
 
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      department: "",
      priority: "Medium",
      location: "",
    });
 
  const [loading, setLoading] =
    useState(false);
 
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
 
      const response =
        await createComplaint(
          formData
        );
 
      toast.success(
        response.message
      );
 
      setFormData({
        title: "",
        description: "",
        department: "",
        priority: "Medium",
        location: "",
      });
 
    } catch (error) {
 
      toast.error(
        error.response?.data
          ?.message ||
        "Failed to create complaint"
      );
 
    } finally {
 
      setLoading(false);
    }
  };
 
  return (
<div>
 
      <PageHeader
        title="Lodge Complaint"
        subtitle="Submit a grievance to the concerned department"
      />
 
      <Card className="p-8">
 
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
>
 
          <Input
            label="Complaint Title"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            placeholder="Enter complaint title"
          />
 
          <div>
 
            <label className="block mb-2 font-medium">
 
              Description
 
            </label>
 
            <textarea
              rows="5"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full border border-gray-300 rounded-lg p-4"
              placeholder="Describe your complaint"
            />
 
          </div>
 
          <div className="grid md:grid-cols-2 gap-6">
 
            <div>
 
              <label className="block mb-2 font-medium">
 
                Department
 
              </label>
 
              <select
                name="department"
                value={
                  formData.department
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-lg p-3"
>
 
                <option value="">
                  Select Department
</option>
 
                <option>
                  Water Supply
</option>
 
                <option>
                  Roads
</option>
 
                <option>
                  Electricity
</option>
 
                <option>
                  Sanitation
</option>
 
                <option>
                  Public Safety
</option>
 
              </select>
 
            </div>
 
            <div>
 
              <label className="block mb-2 font-medium">
 
                Priority
 
              </label>
 
              <select
                name="priority"
                value={
                  formData.priority
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-lg p-3"
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
 
            </div>
 
          </div>
 
          <Input
            label="Location"
            name="location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            placeholder="Enter complaint location"
          />
 
          <Button
            type="submit"
>
 
            {
              loading
                ? "Submitting..."
                : "Submit Complaint"
            }
 
          </Button>
 
        </form>
 
      </Card>
 
    </div>
  );
};
 
export default CreateComplaintPage;