
// import { useState, useEffect } from "react";
// import ServiceList from "../components/ServiceList";
// import DownloadBar from "../components/DownloadBar";
// import { services } from "../data/servicesData";
// import { sendQuotationEmail } from "../services/api";

// export default function Services() {
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//     console.log(storedUser);
//   }, []);


//  // Opens Gmail in browser (most reliable for Windows)
// // const handleEmail = () => {
// //   window.open(`https://mail.google.com`, "_blank");
// // };

// const handleEmail = async () => {
//   // Validation
//   if (!selectedServices?.length) {
//     alert("Please select at least one service");
//     return;
//   }

//   if (!user) {
//     alert("User details not found");
//     return;
//   }

//   if (!user.email) {
//     alert("Please enter your email");
//     return;
//   }

//   try {
//     alert("Sending quotation... ⏳");

//     await sendQuotationEmail(selectedServices, "basic", user);

//     alert("✅ Quotation sent to your email!");
//   } catch (err) {
//     console.error(err);
//     alert("❌ Failed to send email");
//   }
// };

// // Opens Instagram in browser (Instagram Windows app doesn't support deep links)
// const handleInstagram = () => {
//   window.open(`https://instagram.com`, "_blank");
// };


// const handleWhatsApp = () => {
//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//   if (isMobile) {
//     window.open(`https://wa.me/`, `_blank`);
//   } else {
//     window.location.href = `whatsapp://`;
//     setTimeout(() => {
//       window.open(`https://web.whatsapp.com`, `_blank`);
//     }, 1500);
//   }
// };

//   return (
//     <div className=" w-full h-screen flex items-start justify-center">
//       <div className="w-[90vw] h-full bg-[#F8F9FA] ">
//         <div className="bg-[#0B1422] text-white rounded flex items-center justify-between p-2 px-6">
//           <h1 className="p-1 px-2 font-bold text-xl bg-amber-50 text-[#0B1422] rounded uppercase">Our Services</h1>
//           {user && (
//             <p className="capitalize">Customer: {user.name}</p>
//           )}
//         </div>

//         <ServiceList services={services} onSelectionChange={setSelectedServices} />

//         <div className="flex flex-col items-center justify-center mt-5">
//           <p className="text-sm">
//             @ Get Your Customized Quotations at Discounted Rates.{" "}
//             <span>Contact our Experts Team</span>
//           </p>

//           <div className="mt-2 flex items-center gap-6">
//             <div className="flex gap-6">

//               {/* Gmail / Email */}
//               <i
//                 className="fa-regular fa-envelope cursor-pointer text-xl hover:text-red-500 transition-colors"
//                 onClick={handleEmail}
//                 title="Send us an Email"
//               ></i>

//               {/* WhatsApp */}
//               <i
//                 className="fa-brands fa-whatsapp cursor-pointer text-xl hover:text-green-500 transition-colors"
//                 onClick={handleWhatsApp}
//                 title="Chat on WhatsApp"
//               ></i>

//               {/* Instagram */}
//               <i
//                 className="fa-brands fa-instagram cursor-pointer text-xl hover:text-pink-500 transition-colors"
//                 onClick={handleInstagram}
//                 title="Visit our Instagram"
//               ></i>

//             </div>

//             <DownloadBar selectedServices={selectedServices} user={user} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import axios from "axios"; // ✅ add this
import ServiceList from "../components/ServiceList";
import DownloadBar from "../components/DownloadBar";
import { services } from "../data/servicesData";
import { sendQuotationEmail } from "../services/api";
import { sendQuotationEmail, downloadPDF } from "../services/api"; // ✅ add downloadPDF

export default function Services() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [user, setUser] = useState(null);
  const [isSending, setIsSending] = useState(false); // ✅ add loading state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // ✅ wake up backend as soon as page loads
    axios.get("https://livedigit-quotes.onrender.com/health").catch(() => {});
  }, []);

 const handleEmail = async () => {
  if (!selectedServices?.length) return alert("Please select at least one service");
  if (!user) return alert("User details not found");
  if (!user.email) {
    alert("You didn't provide an email address. Please go back and enter your email to receive the quotation.");
    return;
  }

  try {
    setIsSending(true);
    await sendQuotationEmail(selectedServices, "basic", user);
    alert("✅ Quotation sent to your email!");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to send email");
  } finally {
    setIsSending(false);
  }
};

  const handleInstagram = () => window.open(`https://instagram.com`, "_blank");

  // const handleWhatsApp = () => {
  //   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  //   if (isMobile) {
  //     window.open(`https://wa.me/`, `_blank`);
  //   } else {
  //     window.location.href = `whatsapp://`;
  //     setTimeout(() => window.open(`https://web.whatsapp.com`, `_blank`), 1500);
  //   }
  // };

const [isWhatsApp, setIsWhatsApp] = useState(false); // ✅ add this with other states

const handleWhatsApp = async () => {
  if (!selectedServices?.length) return alert("Please select at least one service");

  try {
    setIsWhatsApp(true);

    const res = await downloadPDF(selectedServices, "basic", user);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "quotation.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    const message = encodeURIComponent(
      `Hi, please find the attached quotation PDF for ${user?.business || "your business"}. Kindly check the downloaded file.`
    );

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(`https://wa.me/?text=${message}`, "_blank");
    } else {
      window.open(`https://web.whatsapp.com/send?text=${message}`, "_blank");
    }

  } catch (error) {
    console.error("WhatsApp share failed:", error);
    alert("❌ Failed to generate PDF");
  } finally {
    setIsWhatsApp(false);
  }
};


  return (
    <div className="w-full h-screen flex items-start justify-center">
      <div className="w-[90vw] h-full bg-[#F8F9FA]">
        <div className="bg-[#0B1422] text-white rounded flex items-center justify-between p-2 px-6">
          <h1 className="p-1 px-2 font-bold text-xl bg-amber-50 text-[#0B1422] rounded uppercase">Our Services</h1>
          {user && <p className="capitalize">Customer: {user.name}</p>}
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
            {user?.email ? (
            <i
              className={`fa-regular fa-envelope text-xl transition-colors ${
                isSending
                  ? "text-gray-400 cursor-not-allowed animate-pulse"
                  : "cursor-pointer hover:text-red-500"
              }`}
              onClick={!isSending ? handleEmail : undefined}
              title={isSending ? "Sending..." : "Send Quotation to Email"}
            ></i>
) : (
  <i
    className="fa-regular fa-envelope text-xl text-gray-300 cursor-not-allowed"
    title="No email provided"
  ></i>
)}

              {/* WhatsApp */}
             <i
  className={`fa-brands fa-whatsapp text-xl transition-colors ${
    isWhatsApp
      ? "text-gray-400 cursor-not-allowed animate-pulse"
      : "cursor-pointer hover:text-green-500"
  }`}
  onClick={!isWhatsApp ? handleWhatsApp : undefined}
  title={isWhatsApp ? "Preparing PDF..." : "Share on WhatsApp"}
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

          {/* ✅ loading message below icons */}
         {(isSending || isWhatsApp) && (
  <p className="text-xs text-gray-500 mt-2 mb-1 p-2 animate-pulse">
    {isWhatsApp ? "⏳ Preparing PDF for WhatsApp..." : "⏳ Generating your quotation, please wait..."}
  </p>
)}
        </div>
      </div>
    </div>
  );
}