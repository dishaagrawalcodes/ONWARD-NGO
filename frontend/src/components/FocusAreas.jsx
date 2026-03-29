import { FaBook, FaHeartbeat, FaLeaf, FaFemale } from "react-icons/fa";

const FocusAreas = () => {
  const areas = [
    {
      title: "Education",
      desc: "Providing access to quality education.",
      icon: <FaBook className="w-12 h-12 mx-auto text-blue-500" />,
    },
    {
      title: "Health",
      desc: "Health camps & awareness programs.",
      icon: <FaHeartbeat className="w-12 h-12 mx-auto text-red-500" />,
    },
    {
      title: "Environment",
      desc: "Promoting green initiatives.",
      icon: <FaLeaf className="w-12 h-12 mx-auto text-green-700" />,
    },
    {
      title: "Women Empowerment",
      desc: "Skill development & independence.",
      icon: <FaFemale className="w-12 h-12 mx-auto text-pink-500" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 via-purple-50 to-red-100 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-blue-900 text-center mb-20 tracking-wide">
          Our Focus Areas
        </h2>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((item, i) => (
            <div
              key={i}
              className="relative bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-blue-200 text-center shadow-xl transition-transform duration-500 hover:-translate-y-6 hover:rotate-1 hover:shadow-2xl hover:border-blue-400 group animate-float"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>

              {/* Animated gradient underline */}
              <div className="w-16 h-1 mx-auto mt-6 rounded-full overflow-hidden">
                <div className="h-full w-24 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 animate-slide opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-slide {
            animation: slide 2s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default FocusAreas;
