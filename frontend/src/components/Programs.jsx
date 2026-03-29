import { Link } from "react-router-dom";

const Programs = () => {
  const programs = [
    {
      title: "Education Program",
      desc: "Empowering underprivileged children through quality education and digital access.",
    },
    {
      title: "Health Camps",
      desc: "Community health camps offering free medical checkups and awareness sessions.",
    },
    {
      title: "Food Distribution",
      desc: "Ensuring dignity and nutrition through regular food distribution drives.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-yellow-50 via-white to-slate-100 py-28 px-6 overflow-hidden">
      
      {/* Soft background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Featured Programs
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-red-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg">
            Meaningful initiatives designed to uplift communities and create long-term impact.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <div
              key={i}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 border border-slate-200 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Top accent line */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-red-500 to-blue-600 rounded-full"></span>

              <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-blue-700 transition">
                {p.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-base">
                {p.desc}
              </p>

              <Link
                to="/programs"
                className="inline-flex items-center gap-2 mt-8 font-semibold text-blue-600 group-hover:text-blue-700 transition"
              >
                Learn More
                <span className="inline-block transform group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle floating animation */}
      <style>
        {`
          @keyframes floatSoft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .group {
            animation: floatSoft 7s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Programs;
