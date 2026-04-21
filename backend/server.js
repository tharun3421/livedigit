// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import pdfRoutes from "./routes/pdfRoutes.js";

// dotenv.config();

// const app = express();

// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://livedigit.vercel.app",
//   ],
//   credentials: true,
//   exposedHeaders: ["Content-Disposition"],
// };

// app.use(cors(corsOptions));
// app.options("/{*any}", cors(corsOptions));
// app.use(express.json());

// app.use("/api/pdf", pdfRoutes);

// app.use('/',(req,res)=>{
//   res.send({
//     activeStatus:true,
//     error:false,
//   })
// })

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://livedigit.vercel.app",
  ],
  credentials: true,
  exposedHeaders: ["Content-Disposition"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    message: "API is running",
  });
});

// ❗ IMPORTANT: Export instead of listen
export default app;