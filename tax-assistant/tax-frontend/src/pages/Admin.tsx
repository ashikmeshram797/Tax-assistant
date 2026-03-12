import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const userData = [
  { day: "Mon", users: 12 },
  { day: "Tue", users: 19 },
  { day: "Wed", users: 25 },
  { day: "Thu", users: 32 },
  { day: "Fri", users: 28 },
  { day: "Sat", users: 40 },
  { day: "Sun", users: 35 }
];

const queryData = [
  { day: "Mon", queries: 45 },
  { day: "Tue", queries: 60 },
  { day: "Wed", queries: 75 },
  { day: "Thu", queries: 90 },
  { day: "Fri", queries: 85 },
  { day: "Sat", queries: 110 },
  { day: "Sun", queries: 95 }
];

export default function Admin() {
  return (
    <div>
      <h2>📊 Admin Analytics</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{
          flex: 1,
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <h4>Users This Week</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#0d6efd" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          flex: 1,
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <h4>Queries Per Day</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={queryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="queries" fill="#198754" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}