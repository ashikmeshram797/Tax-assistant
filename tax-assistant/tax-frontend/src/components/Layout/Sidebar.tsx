import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <Link to="/Home">🏠 {!collapsed && "Home"}</Link>
      <Link to="/chat">💬 {!collapsed && "Chat"}</Link>
      <Link to="/admin">⚙️ {!collapsed && "Admin"}</Link>
      <Link to="/users">👥 {!collapsed && "Users"}</Link>
      <Link to="/tax-calculator">💰 {!collapsed && "Tax Calculator"}</Link>
    </div>
  );
}

export default Sidebar;