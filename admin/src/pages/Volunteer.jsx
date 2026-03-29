import { useState, useEffect } from "react";
import api from "../axios/db";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

const Volunteer = () => {
  const [activeView, setActiveView] = useState("view"); // view | add
  const [volunteers, setVolunteers] = useState([]);

  // 🔹 future-ready (jab backend se list lana ho)
  useEffect(() => {
    if (activeView === "view") {
      fetchVolunteers();
    }
  }, [activeView]);

  const fetchVolunteers = async () => {
    try {
      const res = await api.get("/volunteers"); // backend ready hai
      setVolunteers(res.data);
    } catch (err) {
      console.log("Volunteer fetch pending (backend connected later)");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* TOP ACTION BUTTONS */}
      <div className="flex gap-4 mb-8 justify-center md:justify-start">
        <button
          onClick={() => setActiveView("add")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition
            ${
              activeView === "add"
                ? "bg-green-600 text-white"
                : "bg-white border hover:bg-green-50"
            }`}
        >
          <FaUserPlus /> Add Volunteer
        </button>

        <button
          onClick={() => setActiveView("view")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition
            ${
              activeView === "view"
                ? "bg-green-600 text-white"
                : "bg-white border hover:bg-green-50"
            }`}
        >
          <FaUsers /> View Volunteers
        </button>
      </div>

      {/* CONTENT AREA */}
      {activeView === "add" && <AddVolunteer />}
      {activeView === "view" && (
        <ViewVolunteers
          volunteers={volunteers}
          setVolunteers={setVolunteers} // <-- add this
        />
      )}
    </div>
  );
};

export default Volunteer;

const AddVolunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    availability: "",
    message: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLE TEXT INPUT ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone: only digits, max 10
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    // Name & City: letters + space only
    if (name === "name" || name === "city") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ---------------- HANDLE IMAGE ---------------- */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email is required";

    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be exactly 10 digits";

    if (!formData.city.trim()) newErrors.city = "City is required";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.availability.trim())
      newErrors.availability = "Availability is required";

    if (!formData.image) newErrors.image = "Volunteer image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      await api.post("/volunteers", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Volunteer added successfully ✅");

      // Reset
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
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
      <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">
        Add New Volunteer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* IMAGE */}
        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden hover:border-green-500 transition">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-slate-400">Upload Image</span>
              )}
            </div>
            <input
              type="file"
              name="image"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image}</p>
          )}
        </div>

        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          maxLength={10}
        />

        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />

        <Input
          label="Availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          error={errors.availability}
        />

        <Textarea
          label="Message (optional)"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition
            ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }
          `}
        >
          {loading ? "Saving..." : "Save Volunteer"}
        </button>
      </form>
    </div>
  );
};

/* ---------------- REUSABLE INPUT ---------------- */

const Input = ({ label, name, value, onChange, error, maxLength }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition
        ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-slate-300 focus:ring-green-500"
        }
      `}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

/* ---------------- TEXTAREA ---------------- */

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
    />
  </div>
);

const ViewVolunteers = ({ volunteers, setVolunteers }) => {
  /* ---------------- DELETE HANDLER ---------------- */

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="text-sm">
          <p className="font-semibold mb-3">
            Are you sure you want to delete this volunteer?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded bg-slate-200 text-slate-700"
            >
              No
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await confirmDelete(id);
              }}
              className="px-3 py-1 rounded bg-red-600 text-white"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  /* ---------------- CONFIRM DELETE ---------------- */

  const confirmDelete = async (id) => {
    try {
      await api.delete(`/volunteers/${id}`);

      setVolunteers((prev) => prev.filter((v) => v._id !== id));

      toast.success("Volunteer deleted successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete volunteer ❌");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {volunteers.length === 0 && (
        <p className="text-center col-span-full text-slate-500">
          No volunteers yet
        </p>
      )}

      {volunteers.map((v) => (
        <div
          key={v._id}
          className="bg-white rounded-xl shadow p-5 text-center relative"
        >
          <img
            src={`${BASE_URL}${v.image}`}
            alt={v.name}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border border-blue-500"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />

          <h3 className="font-bold">{v.name}</h3>
          <p className="text-sm text-slate-500">{v.email}</p>
          <p className="text-sm">{v.phone}</p>
          <p className="text-sm text-slate-500">
            <span>City: </span>{v.city}</p>
          <p className="text-sm text-slate-500">
            <span>Address: </span>{v.address}</p>
          <p className="text-sm text-slate-500 mb-4">
            <span>Availability: </span>{v.availability}</p>

          {/* DELETE BUTTON */}
          <button
            onClick={() => handleDelete(v._id)}
            className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
