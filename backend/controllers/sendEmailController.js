import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (req, res) => {
  const { name, email, mobile, business, businessLocation } = req.body;

  // ✅ Add these debug logs
  console.log("=== sendEmail called ===");
  console.log("Body:", req.body);
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify(); // ✅ tells exact error
    console.log("✅ Transporter verified");

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: "New User Details Submission",
      html: `
        <h3>User Details</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Business:</b> ${business}</p>
        <p><b>Location:</b> ${businessLocation}</p>
      `,
    });

    console.log("✅ Email sent");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Nodemailer error:", error.message);
    res.status(500).json({ message: "Email failed", error: error.message });
  }
};