import StatusBadge from "../../../components/common/StatusBadge";

const ComplaintTable = ({
  complaints,
  onStatusChange,
}) => {

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">

      <table className="w-full">

        <thead className="bg-[#0b2e59] text-white">

          <tr>

            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Department
            </th>

            <th className="p-4 text-left">
              Priority
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {complaints.map(
            (complaint) => (

              <tr
                key={complaint._id}
                className="border-b"
              >

                <td className="p-4">
                  {complaint.title}
                </td>

                <td className="p-4">
                  {complaint.department}
                </td>

                <td className="p-4">
                  {complaint.priority}
                </td>

                <td className="p-4">

                  <StatusBadge
                    status={complaint.status}
                  />

                </td>

                <td className="p-4">

                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      onStatusChange(
                        complaint._id,
                        e.target.value
                      )
                    }
                    className="border border-gray-300 p-2 rounded"
                  >

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

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default ComplaintTable;