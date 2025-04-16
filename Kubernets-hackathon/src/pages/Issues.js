import React, { useState } from "react";
import './Issues.css';

const Issues = () => {
  const [formData, setFormData] = useState({
    node_cpu_utilization: "",
    container_cpu_usage: "",
    node_memory_utilization: "",
    container_memory_usage: "",
    node_disk_read: "",
    node_disk_write: "",
    disk_io_time: "",
    network_receive: "",
    network_transmit: "",
    network_drops: "",
    pod_cpu_limits: "",
    pod_cpu_requests: "",
    pod_memory_requests: "",
    pod_memory_limits: "",
    active_alerts: "",
    pending_alerts: "",
    pod_crash_events: "",
    node_failures: "",
    cpu_manager_errors: "",
    memory_manager_errors: "",
  });

  const [predictedAnomaly, setPredictedAnomaly] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const predictAnomaly = async () => {
    setLoadingPrediction(true);
    setPredictionError(null);
    setPredictedAnomaly(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Prediction error:", errorData);
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPredictedAnomaly(data.is_anomaly ? "Anomaly Detected" : "No Anomaly Detected");
    } catch (error) {
      console.error("Error during prediction:", error);
      setPredictionError(error.message);
    } finally {
      setLoadingPrediction(false);
    }
  };

  return (
    <div className="prediction-card">
      <h2>⚙️ Anomaly Prediction</h2>
      <div className="input-fields">
        {Object.entries(formData).map(([key, value]) => (
          <div className="input-row" key={key}>
            <label>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>

      <button onClick={predictAnomaly} disabled={loadingPrediction} className="predict-button">
        {loadingPrediction ? "Predicting..." : "Predict Anomaly"}
      </button>

      {predictionError && <p className="error">Error: {predictionError}</p>}
      {predictedAnomaly && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p className="predicted-type">{predictedAnomaly}</p>
        </div>
      )}
    </div>
  );
};

export default Issues;
