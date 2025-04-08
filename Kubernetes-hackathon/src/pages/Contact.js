import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper"; // Ensures smooth transitions
import "../styles/styles.css"; // Ensure your styles are properly linked

const Contact = () => {
  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="contact-container"
      >
      <div class="contact-page">
        <h2 class="heading">📞 Contact Us</h2>
        <p>
          Got questions or feedback? We'd love to hear from you! Reach out to us through any of the channels below.
        </p>

        <h2 class="heading">📬 Email</h2>
        <p>✉ support@varnihack.com</p>

        <div class="failure-container">
        <h2 class="heading">Report a Failure</h2>
        <form>
            <div class="form-group">
                <label for="clusterName">Cluster Name:</label>
                <input type="text" id="clusterName" placeholder="Enter Cluster Name" required></input>
            </div>
            <div class="form-group">
                <label for="failureType">Failure Type:</label>
                <select id="failureType" required>
                    <option value="" disabled selected>Select Failure Type</option>
                    <option value="podcrash">Pod Crash</option>
                    <option value="resourceexhaustion">Resource Exhaustion</option>
                    <option value="networkissue">Network Issue</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="severity">Severity:</label>
                <select id="severity" required>
                    <option value="" disabled selected>Select Severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    </div>

      </motion.div>
    </PageWrapper>
  );
};

export default Contact;