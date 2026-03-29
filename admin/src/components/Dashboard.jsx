import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdPeople, MdGroup, MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "../axios/db";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [volunteerCount, setVolunteerCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  const pageTitle = () => {
    if (location.pathname.includes("volunteers")) return "Volunteers";
    if (location.pathname.includes("members")) return "Members";
    return "Dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Fetch counts for sidebar & dashboard cards
  const fetchCounts = async () => {
    try {
      const volRes = await api.get("/volunteers");
      setVolunteerCount(volRes.data.length);

      const memRes = await api.get("/members");
      setMemberCount(memRes.data.length);
    } catch (err) {
      console.error("Failed to fetch counts:", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* SIDEBAR – DESKTOP */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white p-6 flex-col">
        <h2 className="text-xl font-bold mb-10">Admin Panel</h2>

        <nav className="space-y-2 flex-1">
          <NavItem to="/admin/dashboard" icon={<MdDashboard />} label="Dashboard" />
          <NavItem
            to="/admin/volunteers"
            icon={<MdPeople />}
            label={`Volunteers (${volunteerCount})`}
          />
          <NavItem
            to="/admin/members"
            icon={<MdGroup />}
            label={`Members (${memberCount})`}
          />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 font-semibold text-sm mt-auto"
        >
          <MdLogout size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="font-semibold text-slate-700 text-lg">{pageTitle()}</h1>

          {/* Mobile logout */}
          <button
            onClick={handleLogout}
            className="md:hidden flex items-center gap-1 text-red-600 text-sm font-semibold"
          >
            <MdLogout size={18} />
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-6 pb-20 md:pb-6">
          <Outlet context={{ volunteerCount, memberCount, fetchCounts }} />
        </main>

        {/* BOTTOM NAV – MOBILE */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t flex justify-around py-2">
          <BottomNavItem
            to="/admin/dashboard"
            icon={<MdDashboard />}
            label="Dashboard"
          />
          <BottomNavItem
            to="/admin/volunteers"
            icon={<MdPeople />}
            label={`Volunteers (${volunteerCount})`}
          />
          <BottomNavItem
            to="/admin/members"
            icon={<MdGroup />}
            label={`Members (${memberCount})`}
          />
        </nav>
      </div>
    </div>
  );
};

/* ---------------- NAV ITEMS ---------------- */
const NavItem = ({ to, icon, label }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${active ? "bg-slate-800 text-green-400" : "hover:bg-slate-800"}
      `}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
};

const BottomNavItem = ({ to, icon, label }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center text-xs font-semibold
        ${active ? "text-green-600" : "text-slate-500"}
      `}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );
};

export default Dashboard;
