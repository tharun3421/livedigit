import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    business: "",
    businessLocation: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    const { name, email, mobile, business, businessLocation } = form;

    if (!name || !email || !mobile || !business || !businessLocation) {
      alert("Please fill all fields");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API}/api/send-email`, form);
      alert("Details sent successfully!");
      onClose();
      navigate("/services"); 
    } catch (error) {
      console.error("Email error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to send email. Check console.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-[#0B1422] flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Enter Your Details</h2>
          <button
            onClick={onClose}
            className="cursor-pointer w-8 h-8 flex items-center justify-center bg-[#0B1422] text-white rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Inputs */}
        <input
          name="name"
          placeholder="Customer Name"
          value={form.name || ""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

         <input
          name="email"
          placeholder="Email Address"
          value={form.email || ""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          name="mobile"
          placeholder="Customer Mobile"
          value={form.mobile || ""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          name="business"
          placeholder="Business"
          value={form.business || ""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          name="businessLocation"
          placeholder="Business Location"
          value={form.businessLocation || ""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        {/* Button */}
          <button
      onClick={handleSubmit}
      disabled={loading}
      className="cursor-pointer w-full bg-[#0B1422] hover:bg-[#2A2633] transition p-3 rounded-xl text-white font-medium text-sm disabled:opacity-50"
    >
      {loading ? "Sending..." : "Save"}
    </button>
      </div>
    </div>
  );
}