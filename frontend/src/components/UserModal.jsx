// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function UserModal({ onSave ,onClose  }) {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [business,setBusiness]= useState("");
//   const [businessLocation ,setBusinessLocation] =useState("");

//   const handleSubmit = () => {
//     if (!name || !mobile || !business || !businessLocation) {
//       alert("Please fill all fields");
//       return;
//     }

//     onSave({ name, mobile, business, businessLocation });
//   };

//   const navigate=useNavigate();

//   return (
//     <div style={{
//       position: "fixed",
//       top: 0, left: 0,
//       width: "100%", height: "100%",
//       background: "rgba(0,0,0,0.9)"
//     }}>
//       <div className="flex flex-col" style={{
//         background: "white",
//         padding: "25px",
//         margin: "20vh auto",
//         width: "50vh",
//         minHeight:"35vh",
//         borderRadius:"1rem",
//         zIndex:"1"
//       }}>
//         <div className="flex items-center justify-between">
//           <h2 className=" text-sm flex items-center justify-start  font-bold " >Enter Your Details </h2>
//           <h1 className="flex items-center justify-center cursor-pointer  text-white bg-[#17141E] rounded-4xl py-1 w-9"  onClick={onClose}>X</h1>
//         </div>
//         <input
//         className="border rounded p-1 mt-4 placeholder-gray-400 placeholder-opacity-70 placeholder:text-sm"
//           placeholder="Customer Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//         className="border rounded p-1 mt-4 placeholder-gray-400 placeholder-opacity-70 placeholder:text-sm"
//           placeholder="Customer Mobile"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         <input
//         className="border rounded p-1 mt-4 placeholder-gray-400 placeholder-opacity-70 placeholder:text-sm"
//           placeholder="Bussiness"
//           value={business}
//           onChange={(e) => setBusiness(e.target.value)}
//         />
//         <input
//         className="border rounded p-1 mt-4 placeholder-gray-400 placeholder-opacity-70 placeholder:text-sm"
//           placeholder="Bussiness Location"
//           value={businessLocation}
//           onChange={(e) => setBusinessLocation(e.target.value)}
//         />

//         <button className="bg-amber-500 p-3 rounded-xl mt-7 text-[#fcfcfd] font-medium text-sm cursor-pointer" onClick={handleSubmit}>Save</button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";

export default function UserModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    business: "",
    businessLocation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, mobile, business, businessLocation } = form;

    if (!name || !mobile || !business || !businessLocation) {
      alert("Please fill all fields");
      return;
    }

    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
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
            className="cursor-pointer w-8 h-8 flex items-center justify-center bg-[#17141E] text-white rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Inputs */}
        <input
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          name="mobile"
          placeholder="Customer Mobile"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          name="business"
          placeholder="Business"
          value={form.business}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          name="businessLocation"
          placeholder="Business Location"
          value={form.businessLocation}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="cursor-pointer w-full bg-[#17141E] hover:bg-[#2A2633] transition p-3 rounded-xl text-white font-medium text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
}