import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ca8a04",
  "#2563eb",
  "#9333ea",
  "#15803d",
  "#dc2626",
];

const StatusPieChart = ({
  data,
}) => {

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-[400px]">

      <h2 className="text-xl font-bold text-[#0b2e59] mb-6">
        Complaint Status Report
      </h2>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >

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
};

export default StatusPieChart;