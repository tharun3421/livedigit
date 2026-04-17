import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserModal({ onSave ,onClose  }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [business,setBusiness]= useState("");
  const [businessLocation ,setBusinessLocation] =useState("");

  const handleSubmit = () => {
    if (!name || !mobile || !business || !businessLocation) {
      alert("Please fill all fields");
      return;
    }

    onSave({ name, mobile, business, businessLocation });
  };

  const navigate=useNavigate();

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      background: "rgba(0,0,0,0.9)"
    }}>
      <div className="flex flex-col" style={{
        background: "white",
        padding: "25px",
        margin: "20vh auto",
        width: "50vh",
        minHeight:"35vh",
        borderRadius:"1rem"
      }}>
        <div className="flex items-center justify-between">
          <h2 className=" text-sm flex items-center justify-start  font-bold " >Enter Your Details </h2>
          <h1 className="flex items-center justify-center cursor-pointer  text-white bg-[#17141E] rounded-4xl py-1 w-9"  onClick={onClose}>X</h1>
        </div>
        <input
        className="border rounded p-1 mt-4 placeholder-gray-400 placeholder-opacity-70 placeholder:text-sm"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
        className="border rounded p-1 mt-4 placeholder-gray-400 placeholder-opacity-70 placeholder:text-sm"
          placeholder="Customer Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
        className="border rounded p-1 mt-4 placeholder-gray-400 placeholder-opacity-70 placeholder:text-sm"
          placeholder="Bussiness"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
        />
        <input
        className="border rounded p-1 mt-4 placeholder-gray-400 placeholder-opacity-70 placeholder:text-sm"
          placeholder="Bussiness Location"
          value={businessLocation}
          onChange={(e) => setBusinessLocation(e.target.value)}
        />

        <button className="bg-amber-500 p-3 rounded-xl mt-7 text-[#fcfcfd] font-medium text-sm cursor-pointer" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}