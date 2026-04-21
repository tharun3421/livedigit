import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); 

export const sendEmail = async (req, res) => {
  const { name, email, mobile, business, businessLocation } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,  
      replyTo: email,                                       
      to: "mtharun342@gmail.com",
      subject: "New User Details Submission",
      html: `
        <h3>User Details</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Business:</b> ${business}</p>
        <p><b>Location:</b> ${businessLocation}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Nodemailer error:", error.message); // ✅ log actual error
    res.status(500).json({ message: "Email failed", error: error.message });
  }
};