
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModal from "../components/UserModal";
import QuoteSlider from "../components/QuoteSlider";
import Navbar from "../components/Navbar";
import Purpose from "../sections/Purpose";
import AboutUs from "../sections/AboutUs";
import HoriScroll from "../sections/HoriScroll";

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
      <Navbar />

      {/* Hero Section */}
      <div className=" w-full min-h-full flex flex-col items-center justify-start ">

        <div className="relative rounded w-full md:w-[80vw] lg:w-[80vw] 
                        h-[70vh] mt-6 md:h-[65vh] lg:h-[85vh] lg:mt-5
                        flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">

          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover rounded"
            src="/digi_video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 rounded" />  

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-2">
            <QuoteSlider />

            <p className="text-xs md:text-sm font-medium text-[#aaa8af] mt-2 max-w-md">
              "No confusion, no delays — just smart quotes tailored for you."
            </p>

            {!user && (
              <button
  onClick={() => setShowModal(true)}
  className="relative overflow-hidden group mt-10 md:mt-16 
             px-4 py-2 md:px-5 md:py-3 rounded-xl 
             border border-[#b3b8c0] text-white 
             font-medium text-xs md:text-sm cursor-pointer"
>

  {/* Background Layer */}
  <span className="absolute inset-0 bg-orange-400 scale-y-0 origin-bottom 
                   transition-transform duration-300 ease-in-out 
                   group-hover:scale-y-100"></span>

  {/* Text */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    Enter User Details
  </span>

</button>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <UserModal onSave={handleSave} onClose={() => setShowModal(false)} />
        )}
      </div>
        <AboutUs/>
        <Purpose />
        <HoriScroll/>
    </div>
  );
}