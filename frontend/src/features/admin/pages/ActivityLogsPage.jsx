import { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import axiosInstance from "../../../services/axiosInstance";
import Skeleton from "../../../components/common/Skeleton";

const ActivityLogsPage = () => {
  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const response = await axiosInstance.get("/activity-logs");

      setLogs(response.data.logs || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div>
      <PageHeader
        title="Activity Logs"
        subtitle="Track all actions performed in the system"
      />

      <Card className="p-6">
        <div className="space-y-6">
          {logs.map((log) => (
            <div key={log._id} className="border-l-4 border-[#0B2E59] pl-4">
              <h3 className="font-semibold">{log.action}</h3>

              <p className="text-sm text-gray-500">
                User: {log.performedBy?.name}
              </p>

              <p className="text-sm text-gray-500">
                Complaint: {log.complaint?.trackingId}
              </p>

              <p className="text-sm text-gray-400">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ActivityLogsPage;
