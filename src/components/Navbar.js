import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/styles.css"; // Ensure correct styles are applied

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setLocalIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setLocalIsLoggedIn(false);
    if (setIsLoggedIn) {
      setIsLoggedIn(false); // Ensure the function exists
    }
    setShowLogoutModal(false);
    navigate("/auth", { replace: true });
  };

  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">🌐 VarniHack</h2>

        <ul className="nav-links">
          {isLoggedIn ? (
            <>
              <li className={location.pathname === "/home" ? "active" : ""}>
                <Link to="/home">Home</Link>
              </li>
              <li className={location.pathname === "/dashboard" ? "active" : ""}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className={location.pathname === "/issues" ? "active" : ""}>
                <Link to="/issues">Issues</Link>
              </li>
              <li className={location.pathname === "/anomalies" ? "active" : ""}>
                <Link to="/anomalies">Anomalies</Link>
              </li>
              <li className={location.pathname === "/settings" ? "active" : ""}>
                <Link to="/settings">Settings</Link>
              </li>
              <li className={location.pathname === "/contact" ? "active" : ""}>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className={location.pathname === "/auth" ? "active" : ""}>
              <Link to="/auth">Auth</Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-text">Your changes will automatically be saved.</p>
            <button onClick={confirmLogout} className="btn">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
