
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
    <div className="w-full min-h-screen flex items-start justify-center">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 min-h-screen bg-[#F8F9FA]">

        {/* Header */}
        <div className="bg-[#0B1422] text-white rounded flex items-center justify-between p-2 px-4 sm:px-6">
          <h1 className="p-1 px-2 font-bold text-sm sm:text-xl bg-amber-50 text-[#0B1422] rounded uppercase">
            Our Services
          </h1>
          {user && (
            <p className="capitalize text-xs sm:text-sm truncate max-w-37.5 sm:max-w-xs">
              Customer: {user.name}
            </p>
          )}
        </div>

        {/* Service List */}
        <ServiceList services={services} onSelectionChange={setSelectedServices} />

        {/* Bottom Action Area */}
        <div className="flex flex-col items-center justify-center mt-4 sm:mt-5 pb-6 px-2">
          <p className="text-xs sm:text-sm text-center text-gray-600">
            @ Get Your Customized Quotations at Discounted Rates.{" "}
            <span className="font-medium">Contact our Experts Team</span>
          </p>

          {/* Buttons Row */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 w-full">

            {/* Email Button */}
            <button
              onClick={handleEmail}
              disabled={isSending || !user?.email}
              title={
                isSending ? "Sending..." : !user?.email ? "No email provided" : "Send Quotation to Email"
              }
              className={`flex items-center gap-2 text-white bg-black px-3 py-2 rounded text-xs sm:text-sm transition-opacity w-full sm:w-auto justify-center ${
                isSending || !user?.email
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-80"
              }`}
            >
              {isSending ? (
                <>
                  <span className="animate-spin text-base">⏳</span>
                  <span className="animate-pulse">Sending...</span>
                </>
              ) : (
                <>
                  <i className="fa-regular fa-envelope text-base sm:text-lg" />
                  <span>Send via Mail</span>
                </>
              )}
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              disabled={isWhatsApp}
              title={isWhatsApp ? "Preparing PDF..." : "Share on WhatsApp"}
              className={`flex items-center gap-2 text-white bg-black px-3 py-2 rounded text-xs sm:text-sm transition-opacity w-full sm:w-auto justify-center ${
                isWhatsApp
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-80"
              }`}
            >
              {isWhatsApp ? (
                <>
                  <span className="animate-spin text-base">⏳</span>
                  <span className="animate-pulse">Preparing PDF...</span>
                </>
              ) : (
                <>
                  <i className="fa-brands fa-whatsapp text-base sm:text-lg" />
                  <span>Share on WhatsApp</span>
                </>
              )}
            </button>

            {/* Download Bar */}
            <div className="w-full sm:w-auto flex justify-center">
              <DownloadBar selectedServices={selectedServices} user={user} />
            </div>
          </div>

          {/* Loading Message */}
          {(isSending || isWhatsApp) && (
            <p className="text-xs text-gray-500 mt-3 text-center animate-pulse">
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