import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Color palette for charts
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
];

// Custom tooltip for all charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: 8 }}>
        <strong>{label}</strong>
        <br />
        Value: {payload[0].value}
      </div>
    );
  }
  return null;
};

export const ChartDisplay = ({ data }) => {
  if (!data || data.length === 0) return <p>No chart data available.</p>;

  // Dynamically detect label and value keys
  const keys = Object.keys(data[0]);
  const labelKey = keys.find((key) => typeof data[0][key] === "string");
  const valueKey = keys.find((key) => typeof data[0][key] === "number");
  const limitedData = data.slice(0, 10);

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        padding: "24px 0",
        background: "#f9f9f9",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          minWidth: "1350px",
          padding: "0 24px",
        }}
      >
        {/* Bar Chart */}
        <div style={{ minWidth: 420, flex: 1 }}>
          <h3 style={{ textAlign: "center", marginBottom: 8, fontWeight: 600 }}>
            Bar Chart
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={limitedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={labelKey} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey={valueKey} fill="#82ca9d" cursor="pointer">
                <LabelList dataKey={valueKey} position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{ minWidth: 420, flex: 1 }}>
          <h3 style={{ textAlign: "center", marginBottom: 8, fontWeight: 600 }}>
            Pie Chart
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={limitedData}
                dataKey={valueKey}
                nameKey={labelKey}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {limitedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div style={{ minWidth: 420, flex: 1 }}>
          <h3 style={{ textAlign: "center", marginBottom: 8, fontWeight: 600 }}>
            Line Chart
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={limitedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={labelKey} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey={valueKey} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
