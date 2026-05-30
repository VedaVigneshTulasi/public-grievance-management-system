import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import StatusBadge from "../../../components/common/StatusBadge";
import Skeleton from "../../../components/common/Skeleton";

import {
  getAllComplaints,
  updateComplaintStatus,
  addRemark,
} from "../services/adminService";

const AdminDashboardPage = () => {

  const [complaints, setComplaints] =
    useState([]);

    const [loading, setLoading] =
  useState(true);

  const [selectedComplaint,
    setSelectedComplaint] =
    useState(null);

  const [remark,
    setRemark] =
    useState("");

  useEffect(() => {

    loadComplaints();

  }, []);

const loadComplaints =
  async () => {

    try {

      const data =
        await getAllComplaints();

      setComplaints(
        data.complaints || []
      );

    } catch (error) {

      toast.error(
        "Failed To Load Complaints"
      );

    } finally {

      setLoading(false);
    }
  };
  if (loading) {
  return <Skeleton />;
}

  const handleStatusChange =
    async (
      complaintId,
      status
    ) => {

      try {

        await updateComplaintStatus(
          complaintId,
          status
        );

        toast.success(
          "Status Updated"
        );

        loadComplaints();

      } catch {

        toast.error(
          "Update Failed"
        );
      }
    };

  const handleAddRemark =
    async () => {

      try {

        await addRemark(
          selectedComplaint,
          remark
        );

        toast.success(
          "Remark Added"
        );

        setRemark("");

        loadComplaints();

      } catch {

        toast.error(
          "Failed To Add Remark"
        );
      }
    };

  return (
    <div>

      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage complaints and resolutions"
      />

      <Card className="p-6">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Title
                </th>

                <th className="text-left py-3">
                  Department
                </th>

                <th className="text-left py-3">
                  Priority
                </th>

                <th className="text-left py-3">
                  Status
                </th>

                <th className="text-left py-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {
                complaints.map(
                  (
                    complaint
                  ) => (

                    <tr
                      key={
                        complaint._id
                      }
                      className="border-b"
                    >

                      <td className="py-4">
                        {
                          complaint.title
                        }
                      </td>

                      <td className="py-4">
                        {
                          complaint.department
                        }
                      </td>

                      <td className="py-4">
                        {
                          complaint.priority
                        }
                      </td>

                      <td className="py-4">

                        <StatusBadge
                          status={
                            complaint.status
                          }
                        />

                      </td>

                      <td className="py-4">

                        <select
                          onChange={(e) =>
                            handleStatusChange(
                              complaint._id,
                              e.target.value
                            )
                          }
                          className="border rounded px-3 py-2"
                          defaultValue=""
                        >

                          <option
                            value=""
                            disabled
                          >
                            Change Status
                          </option>

                          <option>
                            Pending
                          </option>

                          <option>
                            Under Review
                          </option>

                          <option>
                            In Progress
                          </option>

                          <option>
                            Resolved
                          </option>

                          <option>
                            Rejected
                          </option>

                        </select>

                        <button
                          onClick={() =>
                            setSelectedComplaint(
                              complaint._id
                            )
                          }
                          className="ml-3 bg-[#0B2E59] text-white px-4 py-2 rounded"
                        >
                          Remarks
                        </button>

                      </td>

                    </tr>
                  )
                )
              }

            </tbody>

          </table>

        </div>

      </Card>

      {
        selectedComplaint && (

          <Card className="p-6 mt-8">

            <h2 className="text-xl font-bold mb-4">

              Add Remark

            </h2>

            <textarea
              rows="4"
              value={remark}
              onChange={(e) =>
                setRemark(
                  e.target.value
                )
              }
              className="w-full border rounded p-4"
            />

            <button
              onClick={
                handleAddRemark
              }
              className="mt-4 bg-green-600 text-white px-5 py-2 rounded"
            >
              Submit Remark
            </button>

          </Card>
        )
      }

    </div>
  );
};

export default AdminDashboardPage;