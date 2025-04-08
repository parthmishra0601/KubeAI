import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/styles.css"; // Import styles

const Settings = () => {
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  // Password Change Popup State
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP Popup State
  const [isOTPPopupOpen, setOTPPopupOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Initialize useNavigate
  const navigate = useNavigate(); // Create navigate function

  // Apply dark mode on load
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  };

  // Toggle Password Change Popup
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  // Handle Password Change (Dummy Function)
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!"); // You can replace this with actual logic
    setPopupOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handle Email Notification Toggle
  const handleEmailNotificationChange = () => {
    const newStatus = !emailNotifications;
    setEmailNotifications(newStatus);
    
    if (newStatus) {
      setOTPPopupOpen(true); // Show OTP popup
      setTimeout(() => {
        setOTPPopupOpen(false); // Auto-close after 3 seconds
      }, 3000);
    }
  };

  // Handle Manage Account Click
  const handleManageAccount = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="settings-container">
      <h2>⚙ Settings</h2>

      <div className="setting-option">
        <button
          id="darkModeToggle"
          onClick={toggleDarkMode}
          className="dark-mode-btn"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="setting-option">
        <h3>🔐 Account Settings</h3>
        <button className="btn" onClick={togglePopup}>Change Password</button>
        <button className="btn" onClick={handleManageAccount}>Manage Account</button> {/* Updated to call handleManageAccount */}
      </div>

      <div className="setting-option">
        <h3>📢 Notifications</h3>
        <label>
          <input 
            type="checkbox" 
            checked={emailNotifications} 
            onChange={handleEmailNotificationChange} 
          /> 
          Enable Email Notifications
        </label>
      </div>

      {/* Password Change Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>🔒 Change Password</h3>
            <input
              type="password"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-enter New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="btn" onClick={handleChangePassword}>
                Confirm
              </button>
              <button className="btn cancel" onClick={togglePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Sent Popup */}
      {isOTPPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>📧 OTP Sent</h3>
            <p>An OTP has been sent to your registered email.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;