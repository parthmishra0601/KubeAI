import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageWrapper = ({ children, customTransition }) => {
  const location = useLocation(); // Ensures proper animations during route changes

  return (
    <motion.main
      key={location.pathname} // Ensures reanimation on route change
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={customTransition || { duration: 0.4, ease: "easeOut" }}
      role="main" // Accessibility improvement
    >
      {children}
    </motion.main>
  );
};

export default PageWrapper;
