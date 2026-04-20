import axios from "axios";

export const downloadPDF = (services, role, user) => {
  return axios.post(
    `https://livedigit.onrender.com/api/pdf/generate`,
    { services, role, user },
    { responseType: "blob" }
  );
};