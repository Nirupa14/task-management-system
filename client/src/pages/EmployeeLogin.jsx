import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      alert(res.data.message);
      navigate("/employee", { state: res.data.user });

    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  // 📝 REGISTER
  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      alert(res.data.message);
      setIsLogin(true); // switch back to login

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? "Employee Login" : "Employee Register"}</h2>

        {/* Name only for register */}
        {!isLogin && (
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={isLogin ? handleLogin : handleRegister}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle */}
        <p style={{ marginTop: "10px" }}>
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

        {/* Admin */}
        <button
          style={styles.adminBtn}
          onClick={() => navigate("/admin")}
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #4facfe, #00f2fe)"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4facfe",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  adminBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default EmployeeLogin;