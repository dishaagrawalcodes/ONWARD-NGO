import { useState } from "react";
import api from "../axios/db.js";

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    availability: "",
    message: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // -------- NAME: letters & spaces only --------
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

    // -------- EMAIL --------
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

    // -------- PHONE: numbers only, max 10 --------
    if (name === "phone") {
      if (/[^0-9]/.test(value)) return;
      if (value.length > 10) return;
      if (value.length !== 10 && value.length > 0) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number must be 10 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }

    // -------- CITY: letters & spaces --------
    if (name === "city") {
      if (/[^A-Za-z\s]/.test(value)) return;
    }
    if (name === "address") {
      if (/[^A-Za-z0-9\s,.-]/.test(value)) return;

      if (value.length < 5 && value.length > 0) {
        setErrors((prev) => ({
          ...prev,
          address: "Address must be at least 5 characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, address: "" }));
      }
    }
    // -------- AVAILABILITY --------
    if (name === "availability") {
      if (value.length < 2 && value.length > 0) {
        setErrors((prev) => ({
          ...prev,
          availability: "Please enter valid availability",
        }));
      } else {
        setErrors((prev) => ({ ...prev, availability: "" }));
      }
    }

    // -------- MESSAGE --------
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

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("city", formData.city);
      data.append("address", formData.address);
      data.append("availability", formData.availability);
      data.append("message", formData.message);
      data.append("image", formData.image);

      await api.post("/volunteers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Volunteer registered successfully ✅");

      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        availability: "",
        message: "",
        image: null,
      });
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-slate-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-red-200 to-blue-300 shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
          Volunteer Registration
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Join our mission and help us create real impact.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden mb-3">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-black text-sm text-center px-2">
                  Upload Photo
                </span>
              )}
            </div>

            <label className="cursor-pointer text-sm text-red-600 font-medium hover:underline">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="+91 98765 43210"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="New Delhi"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Sector-1, New Delhi, India"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Availability */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Availability
            </label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Weekends / 2-3 hrs"
            />
            {errors.availability && (
              <p className="text-red-500 text-sm">{errors.availability}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Why do you want to volunteer?"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-10 py-3 rounded-full font-semibold hover:bg-red-700 transition shadow-lg"
            >
              Register as Volunteer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerRegistration;
