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
        className="about-container bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold mb-4">📢 About Us</h1>
        <p className="mb-4">
          Welcome to <strong>VarniHack</strong>! We are a passionate team dedicated to solving real-world challenges through innovative solutions.
        </p>
        <p className="mb-6">🌟 Our mission is to empower developers and businesses with cutting-edge technology.</p>
        
        <h2 className="text-2xl font-semibold mb-4">🚀 Why Choose Us?</h2>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">✅ Innovation-driven solutions</li>
          <li className="mb-2">✅ User-friendly experiences</li>
          <li className="mb-2">✅ Open-source community support</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">🌱 Our Vision</h2>
        <p className="mb-4">
          At <strong>VarniHack</strong>, our vision is to create technology that not only solves the most pressing challenges but also enriches the lives of those who use it. We aim to bridge the gap between developers and businesses by offering sustainable and scalable solutions that can adapt to an ever-changing world.
        </p>

        <h2 className="text-2xl font-semibold mb-4">👥 Our Team</h2>
        <p className="mb-4">
          Our team consists of passionate developers, designers, and innovators who are committed to pushing the boundaries of what's possible. With diverse skill sets and backgrounds, we work collaboratively to create impactful solutions. We believe in fostering a culture of continuous learning and growth.
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">🔹 Developers with expertise in full-stack development, AI, and blockchain</li>
          <li className="mb-2">🔹 Designers focused on user experience and interaction design</li>
          <li className="mb-2">🔹 Innovators with a drive to solve real-world problems</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">📞 Contact Us</h2>
        <p className="mb-4">
          We're always open to collaborating, brainstorming, and answering your queries. If you're interested in working with us, want to share an idea, or just want to chat about technology, feel free to reach out.
        </p>
        <ul className="pl-6 mb-6">
          <li className="mb-2">📧 Email: <a href="mailto:contact@varnihack.com" className="underline">contact@varnihack.com</a></li>
          <li className="mb-2">🌐 Website: <a href="https://www.varnihack.com" target="_blank" rel="noopener noreferrer" className="underline">www.varnihack.com</a></li>
          <li className="mb-2">📱 Social Media: <a href="https://twitter.com/varnihack" target="_blank" rel="noopener noreferrer" className="underline">Twitter</a>, <a href="https://linkedin.com/company/varnihack" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a></li>
        </ul>
      </motion.div>
    </PageWrapper>
  );
};

export default About;
