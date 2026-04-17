import axios from "axios";

export const downloadPDF = (services, role, user) => {
  return axios.post(
    "http://localhost:5000/api/pdf/generate",
    { services, role, user },
    { responseType: "blob" }
  );
};