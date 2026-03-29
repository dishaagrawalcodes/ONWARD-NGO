import { useState, useEffect } from "react";
import api from "../axios/db";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

const Member = () => {
  const [activeView, setActiveView] = useState("view"); // view | add
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (activeView === "view") {
      fetchMembers();
    }
  }, [activeView]);

  const fetchMembers = async () => {
    try {
      const res = await api.get("/members");
      setMembers(res.data);
    } catch (err) {
      console.log("Member fetch pending (backend connected later)");
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
          <FaUserPlus /> Add Member
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
          <FaUsers /> View Members
        </button>
      </div>

      {/* CONTENT AREA */}
      {activeView === "add" && <AddMember setActiveView={setActiveView} />}
      {activeView === "view" && (
        <ViewMembers members={members} setMembers={setMembers} />
      )}
    </div>
  );
};

export default Member;

/* ---------------- ADD MEMBER ---------------- */
const AddMember = ({ setActiveView }) => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    designation: "",
    areaWorking: "",
    memberID: "",
    aadharMasked: "",
    dob: "",
    validFrom: "",
    validTo: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    if (name === "name" || name === "city") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be exactly 10 digits";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.memberID.trim()) newErrors.memberID = "Member ID is required";
    if (!formData.image) newErrors.image = "Member image is required";
    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father/Wife name required";

    if (!formData.areaWorking.trim())
      newErrors.areaWorking = "Area working required";

    if (!formData.aadharMasked.trim())
      newErrors.aadharMasked = "Aadhar required";

    if (!formData.dob.trim()) newErrors.dob = "DOB required";

    if (!formData.validFrom.trim()) newErrors.validFrom = "Valid From required";

    if (!formData.validTo.trim()) newErrors.validTo = "Valid To required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image") {
          if (formData.image) data.append("image", formData.image);
        } else {
          data.append(key, formData[key] ?? "");
        }
      });

      await api.post("/members", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Member added successfully ✅");

      // Reset form
      setFormData({
        name: "",
        fatherName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        designation: "",
        areaWorking: "",
        memberID: "",
        aadharMasked: "",
        dob: "",
        validFrom: "",
        validTo: "",
        image: null,
      });

      setPreview(null);
      setErrors({});

      // Switch to view after add
      setActiveView("view");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="max-w-5xl mx-auto bg-slate-50 min-h-screen p-6 md:p-12">
  {/* TOP BAR / BREADCRUMB EFFECT */}
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-slate-200 pb-6">
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Add New Member
      </h2>
      
    </div>
    
  </div>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    {/* LEFT COLUMN: AVATAR & QUICK INFO */}
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center sticky top-8">
        <label className="relative cursor-pointer group inline-block">
          <div className="relative w-40 h-40 rounded-2xl border-2 border-dashed border-slate-300 
            flex items-center justify-center overflow-hidden
            group-hover:border-green-500 transition-all bg-slate-50">

            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <div className="mx-auto w-10 h-10 mb-2 text-slate-400">
                   {/* Icon Placeholder */}
                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <span className="text-sm font-medium text-slate-500">Upload Photo</span>
              </div>
            )}
            
            {/* HOVER OVERLAY */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
               <span className="text-white text-xs font-bold">CHANGE PHOTO</span>
            </div>
          </div>
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </label>

       
        
        {errors.image && <p className="text-red-500 text-xs mt-4">{errors.image}</p>}
      </div>
    </div>

    {/* RIGHT COLUMN: FORM FIELDS */}
    <div className="lg:col-span-2 space-y-8">
      
      {/* SECTION: PERSONAL */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-green-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Personal Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input label="Full Name" placeholder="e.g. John Doe" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
          <Input label="Guardian/Spouse Name" name="fatherName" value={formData.fatherName} onChange={handleChange} error={errors.fatherName} required />
          <Input label="Official Email" placeholder="name@ngo.org" name="email" value={formData.email} onChange={handleChange} error={errors.email} required />
          <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} maxLength={10}  required/>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
             <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city}  required/>
             <Input label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} required />
          </div>
        </div>
      </div>

      {/* SECTION: MEMBERSHIP */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Membership Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} error={errors.designation} required />
          <Input label="Working Area/Region" name="areaWorking" value={formData.areaWorking} onChange={handleChange} error={errors.areaWorking} required />
          <Input label="Aadhar (Masked)" placeholder="XXXX-XXXX-1234" name="aadharMasked" value={formData.aadharMasked} onChange={handleChange} error={errors.aadharMasked}  required/>
          <Input label="Member ID" name="memberID" value={formData.memberID} onChange={handleChange} error={errors.memberID}  required />
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
             <Input type="date" label="DOB" name="dob" value={formData.dob} onChange={handleChange} error={errors.dob}  required />
             <Input type="date" label="Valid From" name="validFrom" value={formData.validFrom} onChange={handleChange} error={errors.validFrom}  required/>
             <Input type="date" label="Valid To" name="validTo" value={formData.validTo} onChange={handleChange} error={errors.validTo}  required/>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <button type="button" className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition">
          Cancel
        </button>
        <button
          disabled={loading}
          className={`px-10 py-3 rounded-xl font-bold text-white shadow-lg shadow-green-200 transition-all
            ${loading ? "bg-slate-400" : "bg-green-600 hover:bg-green-700 active:scale-95"}`}
        >
          {loading ? "Processing..." : " Save Member"}
        </button>
      </div>
    </div>
  </form>
</div>
);

};

/* ---------------- VIEW MEMBERS ---------------- */
const ViewMembers = ({ members, setMembers }) => {
  const navigate = useNavigate();

  const handleGenerateId = (member) => {
    navigate("/admin/generate-id", { state: { member } });
  };
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="text-sm">
          <p className="font-semibold mb-3">
            Are you sure you want to delete this member?
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

  const confirmDelete = async (id) => {
    try {
      await api.delete(`/members/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
      toast.success("Member deleted successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete member ❌");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.length === 0 && (
        <p className="text-center col-span-full text-slate-500">
          No members yet
        </p>
      )}

      {members.map((m) => (
        <div
          key={m._id}
          className="bg-white rounded-xl shadow p-5 text-center relative"
        >
          <img
            src={`${BASE_URL}${m.image}`}
            alt={m.name}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border border-blue-500"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />

          <h3 className="font-bold">{m.name}</h3>
          <p className="text-sm text-slate-500">{m.email}</p>
          <p className="text-sm">{m.phone}</p>
          <p className="text-sm text-slate-500">
            <span>City: </span>
            {m.city}
          </p>
          <p className="text-sm text-slate-500">
            <span>Address: </span>
            {m.address}
          </p>
          <p className="text-sm text-slate-500">
            <span>Designation: </span>
            {m.designation}
          </p>
          <p className="text-sm text-slate-500">
            <span>Member ID: </span>
            {m.memberID}
          </p>
          {/* GENERATE ID - LEFT TOP */}
          <button
            onClick={() => handleGenerateId(m)}
            className="absolute top-3 left-3 text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            Generate ID
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={() => handleDelete(m._id)}
            className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

/* ---------------- REUSABLE INPUT ---------------- */
const Input = ({
  label,
  name,
  value,
  onChange,
  error,
  maxLength,
  type = "text",
  required = false,
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      required={required}
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

