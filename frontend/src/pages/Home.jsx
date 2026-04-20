
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModal from "../components/UserModal";
import QuoteSlider from "../components/QuoteSlider";
import Navbar from "../components/Navbar";
import Purpose from "../components/Purpose";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSave = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    setShowModal(false);
    navigate("/services"); 
  };

  return (
   <div>
    <Navbar/>
     <div className="bg-white w-full h-screen flex flex-col items-center justify-center">     
      <div className="relative rounded w-[80vw] h-[70vh] flex flex-col items-center justify-center p-6 overflow-hidden">

        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover rounded"
          src="/digi_video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 rounded" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <QuoteSlider />
          <p className="text-sm font-medium text-[#aaa8af] mt-2">" No confusion, no delays — just smart quotes tailored for you."</p>

          {!user && (
            <button
              className="bg-white p-3 rounded-xl mt-16 text-[#47444e] font-medium text-sm cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Enter User Details
            </button>
          )}
        </div>
      </div>

      {/* ✅ Modal moved OUTSIDE the overflow-hidden div */}
      {showModal && (
        <UserModal onSave={handleSave} onClose={() => setShowModal(false)} />
      )}
    </div>
    <Purpose/>
   </div>
  );
}