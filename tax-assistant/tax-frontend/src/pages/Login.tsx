 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/tax.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await response.json();

        if (data.message === "Login Successful") {
  navigate("/home", { state: { role: data.role } });
} else {
  setError("Invalid email or password.");
}

    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-left">
          <h2>Hello, Welcome!</h2>
          <p>Don't have an account?</p>

          <img src={loginImage} alt="Login Visual" className="left-image" />

          <button
            onClick={() => navigate("/register")}
            className="outline-btn"
          >
            Register
          </button>
        </div>

        <div className="auth-right">
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}

          <button className="main-btn" onClick={handleLogin}>
            Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;