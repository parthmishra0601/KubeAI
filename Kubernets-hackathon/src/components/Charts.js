import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#ff4d4d", "#ffa500", "#1e90ff", "#4caf50", "#ff69b4"]; // Extended colors

const Charts = ({ chartData }) => {
  const [chartType, setChartType] = useState("line");

  if (!chartData || chartData.length === 0) {
    return <p>⏳ Loading Data...</p>; // Prevents blank screen
  }

  return (
    <div className="chart-container">
      <h2>📊 Select a Chart Type</h2>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="chart-selector">
        <option value="line">📈 Line Chart</option>
        <option value="bar">📊 Bar Chart</option>
        <option value="pie">🟠 Pie Chart</option>
      </select>

      <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
        {chartType === "line" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="issues" 
                stroke={COLORS[0]} 
                strokeWidth={3} 
                dot={{ stroke: COLORS[1], strokeWidth: 2 }} 
                animationDuration={500} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="issues" fill={COLORS[2]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === "pie" && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={chartData} 
                dataKey="issues" 
                nameKey="time" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label 
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Charts;
