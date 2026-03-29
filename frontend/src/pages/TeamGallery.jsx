import { useEffect, useState } from "react";
import api from "../axios/db";
import { FaEnvelope, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_IMG_BASE_URL || "";

const TeamGallery = () => {
  const [members, setMembers] = useState([]);

  // Fetch members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/members");
        setMembers(res.data);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      }
    };

    fetchMembers();
  }, []);

  if (members.length === 0) {
    return (
      <p className="text-center text-slate-500 mt-10 text-lg font-medium">
        No team members found.
      </p>
    );
  }

  return (
    <section className="p-6 bg-slate-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-slate-800 relative">
        Our Core Team
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12px] w-24 h-1 bg-blue-600 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={member.image ? `${BASE_URL}${member.image}` : "/default-avatar.png"}
                alt={member.name}
                className="w-full h-64 object-contain rounded-t-2xl"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {member.designation}
              </div>
            </div>

            {/* Info */}
            <div className="p-5 text-center">
              <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
              <p className="flex items-center justify-center gap-2 text-slate-500 mb-1">
                <FaMapMarkerAlt className="text-blue-600" />{member.city}
              </p>
              <p className="flex items-center justify-center gap-2 text-slate-500">
                <FaUserTie className="text-blue-600" /> {member.designation}
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-25 transition duration-300 rounded-2xl"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamGallery;
