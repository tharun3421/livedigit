import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModal from "../components/UserModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSave = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data)); 
    setShowModal(false);
  };

  return (
    <div className="bg-[#17141E] w-full h-screen flex items-center justify-center "  >
     <div className="bg-white rounded w-[80vw] h-[60vh] flex flex-col items-center justify-center p-6">
       <h1 className="text-4xl font-bold text-[#17141E]">Connect. Compare. Choose the Best Quote.</h1>
      <p className="text-sm font-medium text-[#17141E]/70 mt-2">" No confusion, no delays — just smart quotes tailored for you."</p>

   
      {!user && (
        <button className=" bg-amber-500 p-3 rounded-xl mt-16 text-[#fcfcfd] font-medium text-sm cursor-pointer" onClick={() => setShowModal(true)}>
          Enter User Details
        </button>
      )}

      {user && (
        <button className="bg-amber-500 p-3 rounded-xl mt-16 text-[#fcfcfd] font-medium text-sm cursor-pointer" onClick={() => navigate("/services")}>
          Explore Services
        </button>
      )}

      {showModal && <UserModal onSave={handleSave} onClose={() => setShowModal(false)}  />}
        </div>
    </div>
  );
}