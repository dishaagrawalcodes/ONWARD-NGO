import { Link } from "react-router-dom";

const AboutShort = () => {
  return (
    <section className="relative bg-gradient-to-b from-yellow-100 to-slate-100 py-28">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* subtle badge */}
        <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-wider uppercase rounded-full
          bg-red-100 text-blue-700">
          Who We Are
        </span>

        {/* heading */}
        <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold text-slate-900 mb-8">
          About Onward Foundation
        </h2>

        {/* divider */}
        <div className="mx-auto mb-10 h-1 w-20 rounded-full bg-gradient-to-r from-red-400 to-blue-600" />

        {/* content */}
        <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">
            Onward Foundation
          </span>{" "}
          is a non-profit organization committed to uplifting underprivileged
          communities through focused initiatives in education, healthcare,
          environmental sustainability, and women empowerment.
        </p>

        {/* CTA */}
        <Link
          to="/about"
          className="
            inline-flex items-center gap-2 mt-12
            px-8 py-3 rounded-full
            font-semibold tracking-wide
            bg-gradient-to-r from-red-500 to-blue-800
            text-white shadow-lg
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl
          "
        >
          Learn More
          <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
};

export default AboutShort;
