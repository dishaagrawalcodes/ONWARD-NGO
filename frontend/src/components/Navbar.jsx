import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="NGO Logo"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center text-base text-gray-700">
          <Link className="hover:text-red-500 transition" to="/">Home</Link>
          <Link className="hover:text-red-500 transition" to="/about">About Us</Link>
          <Link className="hover:text-red-500 transition" to="/programs">Our Work</Link>
          <Link className="hover:text-red-500 transition" to="/gallery">Our Team</Link>
          <Link className="hover:text-red-500 transition" to="/get-involved">Get Involved</Link>
          <Link className="hover:text-red-500 transition" to="/contact">Contact</Link>

          <Link
            to="/donate"
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition"
          >
            Donate
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded border border-gray-300 hover:border-red-500 transition"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white px-6 overflow-hidden transition-all duration-300 ${
          open ? "max-h-screen py-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {["Home","About Us","Our Work","Gallery","Get Involved","Contact"].map((link, i) => (
          <Link
            key={i}
            to={`/${link === "Home" ? "" : link.toLowerCase().replace(/ /g, "-")}`}
            onClick={() => setOpen(false)}
            className="block text-gray-700 py-2 border-b last:border-b-0 hover:text-red-500 transition"
          >
            {link}
          </Link>
        ))}

        <Link
          to="/donate"
          onClick={() => setOpen(false)}
          className="block bg-red-600 text-white text-center py-2 rounded-full font-semibold hover:bg-red-700 transition mt-3"
        >
          Donate
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
