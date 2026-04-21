import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdfRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import emailSendRoutes from "./routes/sendEmailRoutes.js";
dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://livedigit-frontend.onrender.com",
  ],
  credentials: true,
  exposedHeaders: ["Content-Disposition"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/pdf", pdfRoutes);
app.use("/api/send-email", emailSendRoutes); // ✅ moved up, before /api/email
app.use("/api/email", emailRoutes);          // ✅ now won't intercept send-email

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});