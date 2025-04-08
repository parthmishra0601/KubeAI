import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper"; // Assuming you're using PageWrapper

const About = () => {
  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="about-container"
      >
        <h1>📢 About Us</h1>
        <p>
          Welcome to <strong>VarniHack</strong>! We are a passionate team dedicated to solving real-world challenges through innovative solutions.
        </p>
        <p>🌟 Our mission is to empower developers and businesses with cutting-edge technology.</p>
        <h2>🚀 Why Choose Us?</h2>
        <ul>
          <li>✅ Innovation-driven solutions</li>
          <li>✅ User-friendly experiences</li>
          <li>✅ Open-source community support</li>
        </ul>
      </motion.div>
    </PageWrapper>
  );
};

export default About;
