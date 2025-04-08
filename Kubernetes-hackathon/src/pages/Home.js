import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Home = () => {
  console.log("✅ Home component loaded successfully!");

  return (
    <div className="home-container">
      <h1>🌍 Welcome to Kubernetes Issue Predictor</h1>
      <p>Stay ahead of issues in your Kubernetes cluster with real-time monitoring and predictive analysis.</p>

      {/* 🎯 Quick Action Buttons */}
      <div className="home-buttons">
        <Link to="/dashboard">
          <button className="btn primary">📊 Go to Dashboard</button>
        </Link>
        <Link to="/issues">
          <button className="btn secondary">⚠️ View Issues</button>
        </Link>
      </div>

      {/* 🚀 Feature Highlights */}
      <div className="features">
        {[
          { icon: "🔍", title: "Real-Time Monitoring", description: "Track cluster health and detect issues as they arise." },
          { icon: "🧠", title: "Predictive Analysis", description: "AI-powered insights to forecast potential failures." },
          { icon: "📈", title: "Performance Reports", description: "Detailed analytics for better decision-making." }
        ].map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.icon} {feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
