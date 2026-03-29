import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-4">

        {/* ABOUT */}
        <div className="space-y-4 text-center md:text-left">
          <img
            src={logo}
            alt="Onward Logo"
            className="w-32 mx-auto md:mx-0 cursor-pointer transition hover:scale-105"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <p className="text-gray-300 text-sm leading-relaxed">
            Committed to building brighter futures for underprivileged communities.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link className="hover:text-red-400 transition" to="/">Home</Link></li>
            <li><Link className="hover:text-red-400 transition" to="/about">About Us</Link></li>
            <li><Link className="hover:text-red-400 transition" to="/programs">Our Work</Link></li>
            <li><Link className="hover:text-red-400 transition" to="/donate">Donate</Link></li>
            <li><Link className="hover:text-red-400 transition" to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contact</h4>
          <div className="space-y-3 text-gray-300 text-sm">
            <p className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-red-400" />
              <span>
                +91 111111111 <br />
                +91 222222222
              </span>
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-red-400" />
              info@ngoname.org
            </p>
            <p className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-red-400" />
              xxxxxxxxxxxx
            </p>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © 2026 ONWARD. All rights reserved. <br />
        Technology support by{" "}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-400 transition"
        >
          Disha
        </a>
      </div>

      {/* ICON STYLE */}
      <style>
        {`
          .social-icon {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            background: rgba(255,255,255,0.08);
            transition: all 0.3s ease;
          }
          .social-icon:hover {
            background: #ef4444;
            transform: translateY(-3px);
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
