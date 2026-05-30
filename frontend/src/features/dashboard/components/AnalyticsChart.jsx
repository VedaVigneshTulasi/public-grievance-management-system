import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0B2E59",
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
];

const AnalyticsChart = ({
  data,
}) => {

  return (
    <div className="h-96">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={130}
          >

            {
              data.map(
                (
                  entry,
                  index
                ) => (

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
              )
            }

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default AnalyticsChart;