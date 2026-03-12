
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import loginImage from "../assets/tax.png";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.username || !form.email || !form.password) {
    alert("All fields are required");
    return;
  }

  const response = await fetch("http://127.0.0.1:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();
  alert(data.message);

  if (response.ok) {
    navigate("/");
  }
};

return (
  <div className="auth-container">
    <div className="auth-card">

      <div className="auth-left">
        <h2>Welcome Back!</h2>
        <p>Already have an account?</p>
        {/* Image */}
           <img src={loginImage} alt="Login Visual" className="left-image" />
        <button
          type="button"
          className="switch-btn"
          onClick={() => navigate("/")}
        >
          Login
        </button>
      </div>

      <div className="auth-right">
        <h2>Register</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

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

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>
      </div>

    </div>
  </div>
);
}

export default Register;