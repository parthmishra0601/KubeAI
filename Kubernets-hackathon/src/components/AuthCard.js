"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/styles.css"
import bgImage from "../assets/auth-bg.jpg"

const AuthCard = ({ setIsLoggedIn }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  // Handle Signup
  const handleSignup = (e) => {
    e.preventDefault()
    localStorage.setItem("user", JSON.stringify(signupData))
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
    alert("Signup Successful! 🎉 Redirecting...")
    navigate("/home")
  }

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault()
    const storedUser = JSON.parse(localStorage.getItem("user"))

    if (storedUser && storedUser.email === loginData.email && storedUser.password === loginData.password) {
      localStorage.setItem("isLoggedIn", "true")
      setIsLoggedIn(true)
      alert("Login Successful! 🚀 Redirecting...")
      navigate("/home")
    } else {
      alert("Invalid email or password. Try again!")
    }
  }

  return (
    <div
      className="auth-main-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      {/* Two-panel Auth Card */}
      <div
        className={`auth-panel-container ${isRightPanelActive ? "right-panel-active" : ""}`}
        style={{
          position: "relative",
          zIndex: 2,
          width: "768px",
          maxWidth: "100%",
          minHeight: "480px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
          overflow: "hidden",
        }}
      >
        {/* Sign Up Form */}
        <div
          className="form-container sign-up-container"
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            transition: "all 0.6s ease-in-out",
            left: 0,
            width: "50%",
            opacity: isRightPanelActive ? 1 : 0,
            zIndex: isRightPanelActive ? 5 : 1,
            transform: isRightPanelActive ? "translateX(100%)" : "translateX(0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <form
            onSubmit={handleSignup}
            style={{
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "0 30px",
              height: "100%",
              textAlign: "center",
              width: "100%",
              boxSizing: "border-box",
              overflow: "hidden",
              paddingBottom: "130px",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "1.5rem", maxWidth: "100%" }}>📝 Signup</h2>
            <input
              type="email"
              placeholder="📧 Email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
              style={{
                backgroundColor: "#eee",
                border: "none",
                padding: "12px 15px",
                margin: "8px 0",
                width: "100%",
                borderRadius: "5px",
              }}
            />
            <input
              type="password"
              placeholder="🔑 Password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
              style={{
                backgroundColor: "#eee",
                border: "none",
                padding: "12px 15px",
                margin: "8px 0",
                width: "100%",
                borderRadius: "5px",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-highlight"
              style={{
                marginTop: "15px",
                backgroundColor: "#2D3B55",
                color: "white",
                border: "none",
                padding: "10px 30px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Signup
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className="form-container sign-in-container"
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            transition: "all 0.6s ease-in-out",
            left: 0,
            width: "50%",
            zIndex: 2,
            transform: isRightPanelActive ? "translateX(100%)" : "translateX(0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxSizing: "border-box",
            paddingBottom: "130px",
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "0 30px",
              height: "100%",
              textAlign: "center",
              width: "100%",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "1.5rem", maxWidth: "100%" }}>🔐 Login</h2>
            <input
              type="email"
              placeholder="📧 Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
              style={{
                backgroundColor: "#eee",
                border: "none",
                padding: "12px 15px",
                margin: "8px 0",
                width: "100%",
                borderRadius: "5px",
              }}
            />
            <input
              type="password"
              placeholder="🔑 Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
              style={{
                backgroundColor: "#eee",
                border: "none",
                padding: "12px 15px",
                margin: "8px 0",
                width: "100%",
                borderRadius: "5px",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-highlight"
              style={{
                marginTop: "15px",
                backgroundColor: "#2D3B55",
                color: "white",
                border: "none",
                padding: "10px 30px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Login
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className="overlay-container"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "50%",
            height: "100%",
            overflow: "hidden",
            transition: "transform 0.6s ease-in-out",
            zIndex: 100,
            transform: isRightPanelActive ? "translateX(-100%)" : "translateX(0)",
          }}
        >
          <div
            className="overlay"
            style={{
              background: "linear-gradient(to right,rgb(53, 57, 87),rgb(74, 95, 128))",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "0 0",
              color: "#FFFFFF",
              position: "relative",
              left: "-100%",
              height: "100%",
              width: "200%",
              transform: isRightPanelActive ? "translateX(50%)" : "translateX(0)",
              transition: "transform 0.6s ease-in-out",
            }}
          >
            <div
              className="overlay-panel overlay-left"
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 20px",
                textAlign: "center",
                top: 0,
                height: "100%",
                width: "50%",
                transform: isRightPanelActive ? "translateX(0)" : "translateX(-20%)",
                transition: "transform 0.6s ease-in-out",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <h2 style={{ marginBottom: "15px", fontSize: "1.5rem", maxWidth: "100%" }}>Welcome Back!</h2>
              <p
                style={{
                  marginBottom: "20px",
                  fontSize: "0.9rem",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  lineHeight: "1.4",
                }}
              >
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost btn btn-primary"
                onClick={() => setIsRightPanelActive(false)}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1px solid #FFFFFF",
                  padding: "10px 30px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "15px",
                }}
              >
                Sign In
              </button>
            </div>
            <div
              className="overlay-panel overlay-right"
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 20px",
                textAlign: "center",
                top: 0,
                height: "100%",
                width: "50%",
                right: 0,
                transform: isRightPanelActive ? "translateX(20%)" : "translateX(0)",
                transition: "transform 0.6s ease-in-out",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <h2 style={{ marginBottom: "15px", fontSize: "1.5rem", maxWidth: "100%" }}>Hello, Friend!</h2>
              <p
                style={{
                  marginBottom: "20px",
                  fontSize: "0.9rem",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  lineHeight: "1.4",
                }}
              >
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost btn btn-primary"
                onClick={() => setIsRightPanelActive(true)}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1px solid #FFFFFF",
                  padding: "10px 30px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "15px",
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthCard

