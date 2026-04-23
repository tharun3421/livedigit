
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    business: "",
    businessLocation: "",
  });

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, mobile, business, businessLocation } = form;

    if (!name || !mobile || !business || !businessLocation) {
      alert("Please fill all fields");
      return;
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email");
      return;
    }

    // Save & navigate instantly
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/services");

    // Send email in background (fire-and-forget)
    axios.post(`${API}/api/send-email`, form).catch((error) => {
      console.error("Email error:", error.response?.data || error.message);
    });
  };

  const fields = [
    { name: "name", placeholder: "Customer Name" },
    { name: "email", placeholder: "Email Address (optional)" },
    { name: "mobile", placeholder: "Customer Mobile" },
    { name: "business", placeholder: "Business Name" },
    { name: "businessLocation", placeholder: "Business Location" },
  ];

  return (
    <div
      className="fixed inset-0 bg-[#0B1422] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Enter Your Details</h2>
          <button
            onClick={onClose}
            className="cursor-pointer w-8 h-8 flex items-center justify-center font-extrabold bg-amber-500 text-amber-100 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Inputs */}
        {fields.map(({ name, placeholder }, i) => (
          <input
            key={name}
            name={name}
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              i === fields.length - 1 ? "mb-5" : "mb-3"
            }`}
          />
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="cursor-pointer w-full bg-[#0B1422] hover:bg-[#2A2633] transition p-3 rounded-xl text-white font-medium text-sm"
        >
          Explore Services
        </button>
      </div>
    </div>
  );
}