import { useState } from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // -------- NAME: only letters & spaces --------
    if (name === "name") {
      if (/[^A-Za-z\s]/.test(value)) return;

      if (value.length < 3 && value.length > 0) {
        setErrors((prev) => ({
          ...prev,
          name: "Name must be at least 3 characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }

    // -------- EMAIL: basic allowed characters --------
    if (name === "email") {
      if (/[^a-zA-Z0-9@._-]/.test(value)) return;

      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    // -------- SUBJECT: letters, numbers, spaces --------
    if (name === "subject") {
      if (/[^A-Za-z0-9\s]/.test(value)) return;

      if (value && value.length < 3) {
        setErrors((prev) => ({
          ...prev,
          subject: "Subject must be at least 3 characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, subject: "" }));
      }
    }

    // -------- MESSAGE: allow all chars, only length check --------
    if (name === "message") {
      if (value.length < 10 && value.length > 0) {
        setErrors((prev) => ({
          ...prev,
          message: "Message must be at least 10 characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, message: "" }));
      }
    }

    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!/^[A-Za-z\s]{3,}$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters (min 3 characters)";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Subject (optional)
    if (formData.subject && formData.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    alert("Thank you! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-slate-100 py-20 px-6 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-green-100 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition transform hover:-translate-y-2">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Have a question or want to collaborate? Fill out the form and we
            will respond as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "subject"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">
                  {field.replace("name", "Full Name")}{" "}
                  {field !== "subject" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== "subject"}
                  placeholder={
                    field === "name"
                      ? "John Doe"
                      : field === "email"
                      ? "john@example.com"
                      : "Subject"
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition shadow-sm"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition shadow-sm"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-red-600 text-white font-semibold px-10 py-3 rounded-full hover:bg-red-700 transition shadow-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-8">
          <h3 className="text-3xl font-bold text-gray-800 text-center md:text-left">
            Contact Info
          </h3>
          <p className="text-gray-600 text-center md:text-left">
            You can also reach us via phone, email or visit our office.
          </p>

          <div className="space-y-6 text-gray-700">
            <p className="flex items-center gap-3">
              <MdLocationOn className="text-red-500 w-6 h-6" />
              123 Main Street, City, State, 12345
            </p>
            <p className="flex items-center gap-3">
              <MdPhone className="text-red-500 w-6 h-6" />
               <br /> +91 111111111
            </p>
            <p className="flex items-center gap-3">
              <MdEmail className="text-red-500 w-6 h-6" />
              info@onward.org
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-6 justify-center md:justify-start">
            <a href="#" className="text-gray-600 hover:text-red-600 transition">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600 transition">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600 transition">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
