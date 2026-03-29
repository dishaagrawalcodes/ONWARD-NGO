import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/Login";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";
import Volunteer from "./pages/Volunteer";
import Member from "./pages/Member";
import GenerateId from "./pages/GenerateId";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="volunteers" element={<Volunteer />} />
          <Route path="members" element={<Member />} />
          <Route path="generate-id" element={<GenerateId />} />
        </Route>

        <Route path="*" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
