import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="bg-gradient-to-r from-red-200 to-blue-500 text-white text-center py-32 px-6 relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-spin-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-2xl animate-pulse-slow"></div>

      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
        Together, We Can Make a Difference
      </h2>

      <p className="text-white text-2xl mb-12 max-w-2xl mx-auto">
        Your support helps us reach more lives every day.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Link
          to="/donate"
          className="px-10 py-4 rounded-full bg-orange-500 text-white border-2 border-white font-bold uppercase text-sm tracking-wider transition transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 relative overflow-hidden group"
        >
          Donate
          <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </Link>

        <Link
          to="/get-involved"
          className="px-10 py-4 rounded-full bg-white text-slate-900 border-2 border-green-800 font-bold uppercase text-sm tracking-wider transition transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 relative overflow-hidden group"
        >
          Volunteer
          <span className="absolute inset-0 bg-blue-100/20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
        </Link>

        <Link
          to="/contact"
          className="px-10 py-4 rounded-full bg-green-600 text-white border-2 border-white font-bold uppercase text-sm tracking-wider transition transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 relative overflow-hidden group"
        >
          Get in Touch
          <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </Link>
      </div>

      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 60s linear infinite;
          }

          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 0.4; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default FinalCTA;
