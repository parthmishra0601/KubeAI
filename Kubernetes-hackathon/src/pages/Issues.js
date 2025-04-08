import React, { useState, useEffect } from "react";

const Issues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = () => {
      const anomalyData = JSON.parse(localStorage.getItem("anomalies")) || [];

      // Extract only High/Critical severity anomalies
      const detectedIssues = anomalyData
        .filter(({ severity }) => severity === "High" || severity === "Critical")
        .map(({ id, type, severity, timestamp }) => ({
          id,
          description: `${type} detected`,
          severity,
          timestamp,
          status: Math.random() > 0.5 ? "⚠️ Unresolved" : "🔄 In Progress",
        }));

      setIssues(detectedIssues);
    };

    fetchIssues(); // Initial fetch
    const interval = setInterval(fetchIssues, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card issues-card">
      <h2>🛑 Active Issues</h2>
      {issues.length === 0 ? (
        <p className="no-issues">✅ No critical issues detected</p>
      ) : (
        <div className="table-container">
          <table className="issues-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className={`severity-${issue.severity.toLowerCase()}`}>
                  <td>{issue.id}</td>
                  <td>{issue.description}</td>
                  <td>{issue.severity}</td>
                  <td>{issue.timestamp}</td>
                  <td>{issue.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Issues;
