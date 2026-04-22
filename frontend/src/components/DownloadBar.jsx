// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { downloadPDF } from "../services/api";

// export default function DownloadBar({ selectedServices, user }) {
//   const [isDownloading, setIsDownloading] = useState(false);
//   const navigate = useNavigate();

//   const handleDownload = async () => {
//     if (!selectedServices?.length) return;

//     setIsDownloading(true);

//     try {
//      const res = await downloadPDF(selectedServices, "basic", user);

// const blob = new Blob([res.data], { type: "application/pdf" });
// const url = window.URL.createObjectURL(blob);

// const link = document.createElement("a");
// link.href = url;
// link.download = "quotation.pdf";
// document.body.appendChild(link);
// link.click();

// document.body.removeChild(link);
// window.URL.revokeObjectURL(url);

//       // Clear storage
//       localStorage.clear();


//     } catch (error) {
//       console.error("Download failed:", error);
//       alert("Failed to download PDF. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <div className=" bg-[#17141E] p-2 rounded">

//       <button
//         onClick={handleDownload}
//         disabled={isDownloading}
//         className="text-amber-50 text-sm flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
//       >
//         {isDownloading ? (
//           <>
//             <svg
//               className="animate-spin h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//             >
//               <circle
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 className="opacity-25"
//               />
//               <path
//                 d="M4 12a8 8 0 018-8v8z"
//                 fill="currentColor"
//                 className="opacity-75"
//               />
//             </svg>
//             Downloading...
//           </>
//         ) : (
//           "Download PDF"
//         )}
//       </button>
//     </div>
//   );
// }




import { useState } from "react";
import { downloadPDF } from "../services/api";

export default function DownloadBar({ selectedServices, user }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(""); // ✅ status messages

  const handleDownload = async () => {
    if (!selectedServices?.length) return alert("Please select at least one service");

    setIsDownloading(true);
    setStatusMsg("⏳ Waking up server...");

    try {
      setStatusMsg("📄 Generating your PDF...");
      const res = await downloadPDF(selectedServices, "basic", user);

      setStatusMsg("✅ Almost done...");

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "quotation.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setStatusMsg("");
      localStorage.clear();

    } catch (error) {
      console.error("Download failed:", error);
      setStatusMsg("");
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-[#17141E] p-2 rounded">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="text-amber-50 text-sm flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8v8z" fill="currentColor" className="opacity-75" />
              </svg>
              Downloading...
            </>
          ) : (
            "Download PDF"
          )}
        </button>
      </div>

      {/* ✅ status message shown below button */}
      {statusMsg && (
        <p className="text-xs text-gray-500 animate-pulse">{statusMsg}</p>
      )}
    </div>
  );
}


