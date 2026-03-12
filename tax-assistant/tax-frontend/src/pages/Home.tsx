 import { useLocation } from "react-router-dom";
import "./Home.css";

function Home() {
  const location = useLocation();
  const role = location.state?.role;

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">
        {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h2>

      <div className="cards">

        <div className="card">
          <h3>Total Users</h3>
          <p className="number">1,245</p>
        </div>

        <div className="card">
          <h3>Active Chats</h3>
          <p className="number">342</p>
        </div>

        {/* Admin Specific Card */}
        {role === "admin" && (
          <div className="card">
            <h3>Revenue</h3>
            <p className="number">$8,920</p>
          </div>
        )}

        {/* Admin Only Task */}
        {role === "admin" && (
          <div className="card">
            <h3>Pending Tasks</h3>
            <p className="number">18</p>
          </div>
        )}

        {/* User Only Section */}
        {role !== "admin" && (
          <div className="card">
            <h3>Messages</h3>
            <p className="number">27</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;