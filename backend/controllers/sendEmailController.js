
import nodemailer from "nodemailer";
import dotenv from "dotenv"; // ✅ add this
dotenv.config(); 

export const sendEmail = async (req, res) => {
  const { name, email, mobile, business, businessLocation } = req.body;

  console.log("📩 Received:", req.body);

  // 1. Create Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // 2. Verify connection
    await transporter.verify();

    // 3. Define Mail Options
    const mailOptions = {
      from: `"Live Digit" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends the lead to YOUR email
      replyTo: email,             // Allows you to click 'reply' to reach the customer
      subject: `New Lead: ${name} from ${business}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>New User Submission</h2>
          <hr />
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Mobile:</b> ${mobile}</p>
          <p><b>Business:</b> ${business}</p>
          <p><b>Location:</b> ${businessLocation}</p>
        </div>
      `,
    };

    // 4. Send
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send email", 
      error: error.message 
    });
  }
};