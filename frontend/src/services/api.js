import axios from "axios";

export const downloadPDF = (services, role, user) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/pdf/generate`,
    { services, role, user },
    { responseType: "blob" }
  );
};