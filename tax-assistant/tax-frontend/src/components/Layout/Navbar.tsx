import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

interface NavbarProps {
  toggleSidebar: () => void;
}

function Navbar({ toggleSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

 const handleLogout = () => {
  localStorage.removeItem("isAuth");
  navigate("/");
};
  return (
    <div className="navbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <h3 className="logo">Dashboard</h3>

      <div className="nav-right">
        {/* Dark Mode Toggle */}
        <button className="dark-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Profile */}
        <div className="profile" onClick={() => setOpen(!open)}>
          👤
          {open && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;