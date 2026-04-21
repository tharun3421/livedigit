
import express from "express";
import { generateAndSendEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/send", generateAndSendEmail);

export default router;