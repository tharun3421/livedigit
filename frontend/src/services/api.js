
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
    `${API}/api/email`,
    { services, role, user },
    { timeout: 120000 }
  );
};