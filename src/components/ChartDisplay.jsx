import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
];

export const ChartDisplay = ({ data }) => {
  if (!data || data.length === 0) return <p>No chart data available.</p>;

  // Dynamically detect label and value keys
  const keys = Object.keys(data[0]);
  const labelKey = keys.find((key) => typeof data[0][key] === "string");
  const valueKey = keys.find((key) => typeof data[0][key] === "number");

  if (!labelKey || !valueKey) {
    return <p>Data is not suitable for charting.</p>;
  }

  // Limit to 10 data points
  const limitedData = data.slice(0, 10);

  return (
    <div className="flex mt-6 mb-7 justify-center">
      {/* Bar Chart */}
      <BarChart width={500} height={400} data={limitedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={labelKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={valueKey} fill="#82ca9d" />
      </BarChart>

      {/* Pie Chart */}
      <PieChart width={400} height={300}>
        <Pie
          data={limitedData}
          dataKey={valueKey}
          nameKey={labelKey}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {limitedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
