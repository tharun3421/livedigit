import express from "express";
import cors from "cors";
import pdfRoutes from "./routes/pdfRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  exposedHeaders: ["Content-Disposition"], 
}));
app.use(express.json());

app.use("/api/pdf", pdfRoutes); 

app.listen(5000, () => {  
  console.log("Server running on port 5000");
});