import { Link } from "react-router-dom";

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-blue-50 px-6">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">

        {/* Emoji */}
        <div className="text-6xl mb-4 animate-bounce">🚧</div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Page Under Development
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 mb-8 leading-relaxed">
          We’re working hard to bring something meaningful here.
          This page will be live very soon 💛
        </p>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-blue-600 h-3 w-2/3 rounded-full animate-pulse"></div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
          >
            Go Home
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-slate-400 mt-8">
          Thank you for your patience 🌱
        </p>
      </div>
    </div>
  );
};

export default UnderDevelopment;
