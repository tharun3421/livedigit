
import { useState, useEffect } from "react";
import axios from "axios";
import ServiceList from "../components/ServiceList";
import DownloadBar from "../components/DownloadBar";
import { services } from "../data/servicesData";
import { sendQuotationEmail, downloadPDF } from "../services/api";

export default function Services() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [user, setUser] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    axios.get("https://livedigit-quotes.onrender.com/health").catch(() => {});
  }, []);

  const handleEmail = async () => {
    if (!selectedServices?.length) return alert("Please select at least one service");
    if (!user) return alert("User details not found");
    if (!user.email) {
      alert("You didn't provide an email address. Please go back and enter your email.");
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

        {/* Header */}
        <div className="bg-[#0B1422] text-white rounded flex items-center justify-between p-2 px-6">
          <h1 className="p-1 px-2 font-bold text-xl bg-amber-50 text-[#0B1422] rounded uppercase">
            Our Services
          </h1>
          {user && <p className="capitalize">Customer: {user.name}</p>}
        </div>

        <ServiceList services={services} onSelectionChange={setSelectedServices} />

        <div className="flex flex-col items-center justify-center mt-5">
          <p className="text-sm">
            @ Get Your Customized Quotations at Discounted Rates.{" "}
            <span>Contact our Experts Team</span>
          </p>

          <div className="mt-2 flex items-center gap-6">

            {/* Email Button */}
            <button
              onClick={handleEmail}
              disabled={isSending || !user?.email}
              title={
                isSending
                  ? "Sending..."
                  : !user?.email
                  ? "No email provided"
                  : "Send Quotation to Email"
              }
              className={`flex items-center gap-2 text-white bg-black p-2 rounded transition-opacity ${
                isSending || !user?.email
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-80"
              }`}
            >
              <p className="text-xs capitalize">Send via</p>
              {isSending ? (
                <span className="text-xs animate-pulse">Sending...</span>
              ) : (
                <i className="fa-regular fa-envelope text-xl" />
              )}
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              disabled={isWhatsApp}
              title={isWhatsApp ? "Preparing PDF..." : "Share on WhatsApp"}
              className={`flex items-center gap-2 text-white bg-black p-2 rounded transition-opacity ${
                isWhatsApp
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-80"
              }`}
            >
              <p className="text-xs capitalize">Share on</p>
              {isWhatsApp ? (
                <span className="text-xs animate-pulse">Preparing...</span>
              ) : (
                <i className="fa-brands fa-whatsapp text-xl" />
              )}
            </button>

            <DownloadBar selectedServices={selectedServices} user={user} />
          </div>

          {/* Loading message */}
          {(isSending || isWhatsApp) && (
            <p className="text-xs text-gray-500 mt-2 mb-1 p-2 animate-pulse">
              {isWhatsApp
                ? "⏳ Preparing PDF for WhatsApp..."
                : "⏳ Generating your quotation, please wait..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}