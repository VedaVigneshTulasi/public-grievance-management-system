import {
  CheckCircle,
  Clock,
} from "lucide-react";

const ActivityTimeline = ({
  complaint,
}) => {
  const timeline = [
    {
      title: "Complaint Created",
      date: complaint.createdAt,
    },

    {
      title: `Status: ${complaint.status}`,
      date: complaint.updatedAt,
    },

    ...(complaint.remarks || []).map(
      (remark) => ({
        title: `Remark: ${remark.text}`,
        date: remark.createdAt,
      })
    ),
  ];

  return (
    <div className="space-y-4">
      {timeline.map(
        (item, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            <div>
              <CheckCircle
                size={20}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="font-medium">
                {item.title}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(
                  item.date
                ).toLocaleString()}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ActivityTimeline;