import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/heroPC1.jpg";
import hero3 from "../assets/hero13.jpg";

const images = [hero1, hero2, hero3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white transition-all duration-1000"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

      {/* content */}
      <div className="relative z-10 w-full px-5 text-center">
        <h1
          className="
    mx-auto inline-block
    font-black drop-shadow-lg tracking-[-0.03em]
    text-[clamp(1.6rem,4vw,4.5rem)]
    whitespace-normal sm:whitespace-nowrap
    leading-tight"
        >
          Onward Foundation
        </h1>

        <p className="mt-5 mb-10 max-w-3xl mx-auto text-lg md:text-xl text-slate-100 drop-shadow">
        Transforming Lives Through Education, Healthcare, and Sustainable community growth.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            className="px-8 py-3 rounded-full bg-orange-500 text-white border-2 border-white font-semibold uppercase text-sm tracking-wider transition hover:-translate-y-1 hover:shadow-xl"
            to="/donate"
          >
            Donate Now
          </Link>

          <Link
            className="px-8 py-3 rounded-full bg-white text-slate-900 border-2 border-green-800 font-semibold uppercase text-sm tracking-wider transition hover:-translate-y-1 hover:shadow-xl"
            to="/get-involved"
          >
            Volunteer
          </Link>

          <Link
            className="px-8 py-3 rounded-full bg-green-600 text-white border-2 border-white font-semibold uppercase text-sm tracking-wider transition hover:-translate-y-1 hover:shadow-xl"
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
