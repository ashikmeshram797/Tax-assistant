import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ChatPage from "./pages/ChatPage";
import UserView from "./pages/UserView";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout/Layout";
import TaxCalculator from "./pages/TaxCalculator";

function App() {
  return (
    <BrowserRouter>
      <Routes>

  {/* Public Routes */}
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected Routes */}
  <Route element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/users" element={<UserView />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/tax-calculator" element={<TaxCalculator />} />
    </Route>
  </Route>

</Routes>
    </BrowserRouter>
  );
}

export default App;