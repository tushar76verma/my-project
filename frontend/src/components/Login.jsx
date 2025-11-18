import React, { useState } from "react";
import axios from "axios";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      })
      .catch(() => setError("Invalid login credentials"));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "360px",
          padding: "30px",
          borderRadius: "15px",
          background: "white",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.6s ease",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "28px",
            color: "#6a11cb",
            fontWeight: "bold",
          }}
        >
          Welcome Back
        </h2>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "2px solid #dcdcdc",
              fontSize: "16px",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6a11cb")}
            onBlur={(e) => (e.target.style.borderColor = "#dcdcdc")}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "2px solid #dcdcdc",
              fontSize: "16px",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6a11cb")}
            onBlur={(e) => (e.target.style.borderColor = "#dcdcdc")}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #ff6a00, #ee0979)",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(238, 9, 121, 0.4)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
