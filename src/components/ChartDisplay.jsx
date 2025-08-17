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

  return (
    <div className="flex flex-wrap gap-2 mt-6 mb-7 justify-center">
      {/* Bar Chart */}
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="num_retailers" fill="#82ca9d" />
      </BarChart>

      {/* Pie Chart */}
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="num_retailers"
          nameKey="Category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
