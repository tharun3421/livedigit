
// import axios from "axios";

// const API = "https://livedigit-quotes.onrender.com";
// // const API = "http://localhost:5000";

// export const downloadPDF = async (services, role, user) => {
//   const response = await axios.post(
//     `${API}/api/pdf/generate`,
//     { services, role, user },
//     { 
//       responseType: "blob",
//       timeout: 60000, // ✅ 60 seconds — gives Render time to wake up + generate PDF
//     }
//   );

//   return response;
// };

// export const sendQuotationEmail = async (services, role, user) => {
//   return await axios.post(`${API}/api/send-email`, {
//     services,
//     role,
//     user,
//   });
// };


import axios from "axios";

const API = "https://livedigit-quotes.onrender.com";

const wakeUp = () => axios.get(`${API}/health`).catch(() => {});

export const downloadPDF = async (services, role, user) => {
  await wakeUp();

  const response = await axios.post(
    `${API}/api/pdf/generate`,
    { services, role, user },
    {
      responseType: "blob",
      timeout: 120000,
    }
  );

  return response;
};

export const sendQuotationEmail = async (services, role, user) => {
  await wakeUp();

  return await axios.post(
    `${API}/api/send-email`,
    { services, role, user },
    { timeout: 120000 }
  );
};