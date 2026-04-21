import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

// ✅ Add deployed frontend URL
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",

    "https://livedigit-frontend.onrender.com",

    "https://livedigit-frontend.onrender.com",
  ],
  credentials: true,
  exposedHeaders: ["Content-Disposition"],
};

// IMPORTANT: apply cors first
app.use(cors(corsOptions));

// ✅ FIX preflight route (your current one is wrong)
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/api/pdf", pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

