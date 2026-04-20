// import express from "express";
// import cors from "cors";
// import pdfRoutes from "./routes/pdfRoutes.js";
// import dotenv from "dotenv";
// dotenv.config();
// const app = express();

// app.use(cors({
//   origin: "http://localhost:5173", 
//   exposedHeaders: ["Content-Disposition"], 
// }));
// app.use(express.json());

// app.use("/api/pdf", pdfRoutes); 

// app.listen(process.env.PORT, () => {  
//   console.log(`Server is running on port ${process.env.PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://livedigit.vercel.app"],
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  })
);

app.options("*", cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/pdf", pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// // ✅ Middleware
// app.use(express.json());

// // ✅ CORS (IMPORTANT)
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://livedigit.vercel.app"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
//   })
// );

// // ✅ Handle preflight requests
// app.options("*", cors());

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // ✅ PDF Route
// app.post("/api/pdf/generate", async (req, res) => {
//   try {
//     const { services, role, user } = req.body;

//     // 👉 Replace this with your real PDF logic
//     const pdfBuffer = Buffer.from("This is a sample PDF");

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=quotation.pdf"
//     );

//     res.send(pdfBuffer);
//   } catch (error) {
//     console.error("PDF Error:", error);
//     res.status(500).json({ message: "PDF generation failed" });
//   }
// });

// // ✅ Port
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });