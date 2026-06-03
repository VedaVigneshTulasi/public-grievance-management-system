import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#0B2E59",
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
];

const AnalyticsChart = ({
  data = [],
  type = "pie",
}) => {

  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return (
      <div className="text-center py-10 text-gray-500">
        No Chart Data Available
      </div>
    );
  }

  /* ==========================
     PIE CHART
  ========================== */

  if (type === "pie") {
    return (
      <div className="h-72 w-full" style={{ minHeight: "300px", minWidth: "100%" }}>

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="count"
              nameKey="_id"
              outerRadius={120}
              label
            >

              {data.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>
    );
  }

  /* ==========================
     BAR CHART
  ========================== */

  return (
    <div className="h-72 w-full" style={{ minHeight: "300px", minWidth: "100%" }}>

      <ResponsiveContainer width="100%" height="100%">

        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="_id" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="count"
            fill="#0B2E59"
            barSize={24}
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default AnalyticsChart;