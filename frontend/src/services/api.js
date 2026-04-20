import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const downloadPDF = async (services, role, user) => {
  const response = await axios.post(
    `${API}/api/pdf/generate`,
    { services, role, user },
    { responseType: "blob" }
  );

  return response; // ✅ IMPORTANT
};