import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DepartmentBarChart = ({
  data,
}) => {

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-[400px]">

      <h2 className="text-xl font-bold text-[#0b2e59] mb-6">
        Department Complaints
      </h2>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >

        <BarChart data={data}>

          <XAxis dataKey="_id" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#0b2e59"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default DepartmentBarChart;