// import axios from "axios";

// const API = "https://livedigit-quotes.onrender.com";

// export const downloadPDF = async (services, role, user) => {
//   const response = await axios.post(
//     `${API}/api/pdf/generate`,
//     { services, role, user },
//     { responseType: "blob" }
//   );

//   return response; // ✅ IMPORTANT
// };


import axios from "axios";

const API = "https://livedigit-quotes.onrender.com";

export const downloadPDF = async (services, role, user) => {
  const response = await axios.post(
    `${API}/api/pdf/generate`,
    { services, role, user },
    { 
      responseType: "blob",
      timeout: 60000, // ✅ 60 seconds — gives Render time to wake up + generate PDF
    }
  );

  return response;
};