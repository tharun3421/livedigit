import express from "express";
import cors from "cors";
import pdfRoutes from "./routes/pdfRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  exposedHeaders: ["Content-Disposition"], 
}));
app.use(express.json());

app.use("/api/pdf", pdfRoutes); 

app.listen(process.env.PORT, () => {  
  console.log(`Server is running on port ${process.env.PORT}`);
});