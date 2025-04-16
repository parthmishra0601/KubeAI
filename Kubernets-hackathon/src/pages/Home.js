import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/styles.css";

const Home = () => {
  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: "linear-gradient(to right, #e0f7fa, #f5faff)",
        minHeight: "100vh",
        padding: "3rem",
      }}
    >
      <motion.h1 className="home-title" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        🌍 Welcome to Kubernetes Issue Predictor
      </motion.h1>

      <motion.p className="home-description" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        Stay ahead of issues in your Kubernetes cluster with real-time monitoring and AI-powered predictive analysis.
      </motion.p>

      <motion.div className="home-buttons" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
        <Link to="/dashboard"><motion.button whileHover={{ scale: 1.05 }} className="btn primary">📊 Go to Dashboard</motion.button></Link>
        <Link to="/issues"><motion.button whileHover={{ scale: 1.05 }} className="btn secondary">⚠️ View Issues</motion.button></Link>
      </motion.div>

      {/* 🚀 Feature Highlights */}
      <div className="features">
        {[
          { icon: "🔍", title: "Real-Time Monitoring", description: "Track cluster health and detect issues instantly." },
          { icon: "🧠", title: "Predictive Analysis", description: "AI-powered insights to forecast potential failures." },
          { icon: "📈", title: "Performance Reports", description: "Detailed analytics for better decision-making." }
        ].map((feature, index) => (
          <motion.div
            className="feature-card"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.2 }}
          >
            <h3>{feature.icon} {feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* 💡 Why Choose Us */}
      <motion.div className="why-us" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <h2>💡 Why Choose Us?</h2>
        <ul>
          <li>✅ Instant alerts on critical issues</li>
          <li>✅ Accurate predictions powered by AI</li>
          <li>✅ User-friendly dashboard and reports</li>
          <li>✅ Continuous updates and improvements</li>
        </ul>
      </motion.div>

      {/* 💬 Testimonials */}
      <motion.div className="testimonials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <h2>💬 What Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>“This tool saved us from multiple outages. The predictions are scary accurate!”</p>
            <span>- DevOps Engineer, CloudCorp</span>
          </div>
          <div className="testimonial">
            <p>“The UI is simple and effective. Our team loves using it daily.”</p>
            <span>- SRE Lead, KubeServe</span>
          </div>
        </div>
      </motion.div>

      {/* 🚀 Getting Started */}
      <motion.div className="getting-started" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <h2>🚀 Ready to Get Started?</h2>
        <p>Connect your Kubernetes cluster and start tracking within minutes.</p>
        <Link to="/dashboard">
          <motion.button whileHover={{ scale: 1.1 }} className="btn primary">🔗 Connect Now</motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;
