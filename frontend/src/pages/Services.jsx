
import { useState, useEffect } from "react";
import ServiceList from "../components/ServiceList";
import DownloadBar from "../components/DownloadBar";
import { services } from "../data/servicesData";

export default function Services() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    console.log(storedUser);
  }, []);


 // Opens Gmail in browser (most reliable for Windows)
const handleEmail = () => {
  window.open(`https://mail.google.com`, "_blank");
};

// Opens Instagram in browser (Instagram Windows app doesn't support deep links)
const handleInstagram = () => {
  window.open(`https://instagram.com`, "_blank");
};


const handleWhatsApp = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = `whatsapp://`;
  } else {
    window.open(`https://web.whatsapp.com`, `_blank`);
  }
};


  return (
    <div className=" w-full h-screen flex items-start justify-center">
      <div className="w-[90vw] h-full bg-[#F8F9FA] ">
        <div className="bg-[#0B1422] text-white rounded flex items-center justify-between p-2 px-6">
          <h1 className="p-1 px-2 font-bold text-xl bg-amber-50 text-[#0B1422] rounded uppercase">Our Services</h1>
          {user && (
            <p className="capitalize">Customer: {user.name}</p>
          )}
        </div>

        <ServiceList services={services} onSelectionChange={setSelectedServices} />

        <div className="flex flex-col items-center justify-center mt-5">
          <p className="text-sm">
            @ Get Your Customized Quotations at Discounted Rates.{" "}
            <span>Contact our Experts Team</span>
          </p>

          <div className="mt-2 flex items-center gap-6">
            <div className="flex gap-6">

              {/* Gmail / Email */}
              <i
                className="fa-regular fa-envelope cursor-pointer text-xl hover:text-red-500 transition-colors"
                onClick={handleEmail}
                title="Send us an Email"
              ></i>

              {/* WhatsApp */}
              <i
                className="fa-brands fa-whatsapp cursor-pointer text-xl hover:text-green-500 transition-colors"
                onClick={handleWhatsApp}
                title="Chat on WhatsApp"
              ></i>

              {/* Instagram */}
              <i
                className="fa-brands fa-instagram cursor-pointer text-xl hover:text-pink-500 transition-colors"
                onClick={handleInstagram}
                title="Visit our Instagram"
              ></i>

            </div>

            <DownloadBar selectedServices={selectedServices} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}