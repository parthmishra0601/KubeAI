import React, { useState, useEffect } from "react";
import Charts from "../components/Charts";
import "../styles/styles.css";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [filteredData, setFilteredData] = useState([]);
  const [notebookOutputs, setNotebookOutputs] = useState([]);
  const [stats, setStats] = useState({
    healthyNodes: 12,
    issuesDetected: 0,
    pendingFixes: 0,
    anomalies: 0,
  });

  useEffect(() => {
    const fetchNotebookOutput = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/conversations");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.warn("⚠️ API did not return an array.");
          return;
        }

        const parsedData = data.map((output) => parseNotebookOutput(output));
        setNotebookOutputs(parsedData);
        updateStats(parsedData);

        const chartData = generateChartData(parsedData);
        setFilteredData(chartData);
      } catch (error) {
        console.error("❌ Error fetching notebook output:", error);
      }
    };

    fetchNotebookOutput();
    const interval = setInterval(fetchNotebookOutput, 5000);
    return () => clearInterval(interval);
  }, []);

  const parseNotebookOutput = (output) => {
    const safeOutput = typeof output === "string" ? output : JSON.stringify(output);
    const lines = safeOutput.split("\n");

    const epochLossMatch = lines.find((line) => line.includes("Loss:"));
    const detectedIssueMatch = lines.find((line) => line.includes("Detected Issue:"));
    const probabilityMatch = lines.find((line) => line.includes("Probability:"));

    return {
      timestamp: new Date().toLocaleString(),
      eventMessage: epochLossMatch || "No training data",
      podStatus: detectedIssueMatch ? "Warning" : "Normal",
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 1000),
      predictedIssue: detectedIssueMatch || "No issue detected",
      confidence: probabilityMatch ? probabilityMatch.split(":")[1].trim() : "N/A",
    };
  };

  const updateStats = (parsedData) => {
    const newIssues = parsedData.filter((entry) => entry.predictedIssue !== "No issue detected").length;
    const newAnomalies = parsedData.filter((entry) => entry.predictedIssue === "Anomaly").length;

    setStats({
      healthyNodes: Math.max(12 - newIssues, 5),
      issuesDetected: newIssues,
      pendingFixes: Math.max(newIssues - newAnomalies, 0),
      anomalies: newAnomalies,
    });
  };

  const generateChartData = (data) => {
    const grouped = {};
    data.forEach((entry) => {
      const time = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      grouped[time] = grouped[time] || 0;
      if (entry.predictedIssue !== "No issue detected") {
        grouped[time] += 1;
      }
    });

    return Object.entries(grouped).map(([time, issues]) => ({ time, issues }));
  };

  return (
    <div className="container">
      <h1>🚀 Kubernetes Issue Predictor</h1>
      <p>📊 Monitor & predict issues before they escalate.</p>

      <label className="filter-label">📅 Select Time Range:</label>
      <select
        className="filter-dropdown"
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
      >
        <option value="24h">🕒 Last 24 Hours</option>
        <option value="7d">📆 Last 7 Days</option>
        <option value="30d">📅 Last 30 Days</option>
      </select>

      <div className="card-container">
        <div className="card healthy">
          <h3>🟢 Healthy Nodes</h3>
          <p>{stats.healthyNodes}</p>
        </div>
        <div className="card issues">
          <h3>⚠️ Issues Detected</h3>
          <p>{stats.issuesDetected}</p>
        </div>
        <div className="card pending">
          <h3>🔄 Pending Fixes</h3>
          <p>{stats.pendingFixes}</p>
        </div>
        <div className="card anomalies">
          <h3>🚨 Anomalies</h3>
          <p>{stats.anomalies}</p>
        </div>
      </div>

      {/* ✅ Chart Above Table */}
      <Charts chartData={filteredData} />

      <h2>🛑 Recent Issues & Notebook Output</h2>
      <table className="issues-table">
        <thead>
          <tr>
            <th>📅 Timestamp</th>
            <th>📢 Event Message</th>
            <th>📊 Pod Status</th>
            <th>⚡ CPU Usage</th>
            <th>💾 Memory Usage</th>
            <th>🚨 Predicted Issue</th>
            <th>✅ Confidence (%)</th>
          </tr>
        </thead>
        <tbody>
          {notebookOutputs.length > 0 ? (
            notebookOutputs.map((entry, index) => (
              <tr key={index}>
                <td>{entry.timestamp}</td>
                <td>
                  <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {entry.eventMessage}
                  </pre>
                </td>
                <td>{entry.podStatus}</td>
                <td>{entry.cpuUsage} %</td>
                <td>{entry.memoryUsage} MB</td>
                <td>{entry.predictedIssue}</td>
                <td>{entry.confidence}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No output available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
