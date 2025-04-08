import React, { useState, useEffect, useCallback } from "react";

const Anomalies = () => {
  const [anomalies, setAnomalies] = useState([]);

  // 🎯 Wrap fetchAnomalies in useCallback to avoid unnecessary re-creation
  const fetchAnomalies = useCallback(() => {
    const possibleAnomalies = [
      { id: 1, type: "Pod Failure", severity: "High" },
      { id: 2, type: "High CPU Usage", severity: "Medium" },
      { id: 3, type: "Network Latency", severity: "Low" },
      { id: 4, type: "Memory Leak", severity: "Medium" },
      { id: 5, type: "Disk IO Bottleneck", severity: "High" },
      { id: 6, type: "Node Unresponsive", severity: "Critical" },
    ];

    const updatedAnomalies = possibleAnomalies.map((anomaly) => ({
      ...anomaly,
      severity: getRandomSeverity(),
      timestamp: new Date().toLocaleString(),
    }));

    const activeAnomalies = updatedAnomalies
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 3);

    setAnomalies(activeAnomalies);
    localStorage.setItem("anomalies", JSON.stringify(activeAnomalies));
  }, []);

  const getRandomSeverity = () => {
    const levels = ["Low", "Medium", "High", "Critical"];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  useEffect(() => {
    fetchAnomalies(); // Call on mount

    const interval = setInterval(fetchAnomalies, 10000); // Auto-update every 10 sec

    const syncAnomalies = () => {
      const storedAnomalies = JSON.parse(localStorage.getItem("anomalies"));
      if (storedAnomalies) setAnomalies(storedAnomalies);
    };

    window.addEventListener("storage", syncAnomalies);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncAnomalies);
    };
  }, [fetchAnomalies]); // ✅ Now useEffect has the correct dependency

  return (
    <div className="anomalies-container">
      <h2>🚨 Real-Time Anomaly Detection</h2>
      {anomalies.length === 0 ? (
        <p>No anomalies detected ✅</p>
      ) : (
        <table className="anomalies-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.map((anomaly) => (
              <tr key={anomaly.id} className={`severity-${anomaly.severity.toLowerCase()}`}>
                <td>{anomaly.id}</td>
                <td>{anomaly.type}</td>
                <td>{anomaly.severity}</td>
                <td>{anomaly.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Anomalies;
