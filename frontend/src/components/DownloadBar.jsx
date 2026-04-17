

import { useState } from "react";
import { downloadPDF } from "../services/api";

export default function DownloadBar({ selectedServices, user }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
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
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex">
      <div className="absolute right-40 bg-amber-500 p-2 rounded">
        <button
          className="cursor-pointer text-amber-50 text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-amber-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Downloading...
            </>
          ) : (
            "Download PDF"
          )}
        </button>
      </div>
    </div>
  );
}