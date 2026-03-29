import { FaUsers, FaUserFriends } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

const DashboardHome = () => {
  const { volunteerCount, memberCount } = useOutletContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Volunteers Card */}
      <div className="bg-green-600 text-white rounded-xl shadow p-6 flex items-center gap-4">
        <div className="text-4xl">
          <FaUsers />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{volunteerCount}</h2>
          <p>Volunteers</p>
        </div>
      </div>

      {/* Members Card */}
      <div className="bg-blue-600 text-white rounded-xl shadow p-6 flex items-center gap-4">
        <div className="text-4xl">
          <FaUserFriends />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{memberCount}</h2>
          <p>Members</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
