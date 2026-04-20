// import axios from "axios";

// export const downloadPDF = (services, role, user) => {
//   return axios.post(
//     `https://livedigit.onrender.com/api/pdf/generate`,
//     { services, role, user },
//     { responseType: "blob" }
//   );
// };

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const downloadPDF = async (services, role, user) => {
  try {
    const response = await axios.post(
      `${API}/api/pdf/generate`,
      { services, role, user },
      {
        responseType: "blob",
        withCredentials: true
      }
    );

    // ✅ Create download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "quotation.pdf");

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download failed:", error);
  }
};