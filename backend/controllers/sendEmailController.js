// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const sendEmail = async (req, res) => {
//   const { name, email, mobile, business, businessLocation } = req.body;

//   // ✅ Add these debug logs
//   console.log("=== sendEmail called ===");
//   console.log("Body:", req.body);
//   console.log("EMAIL_USER:", process.env.EMAIL_USER);
//   console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.verify(); // ✅ tells exact error
//     console.log("✅ Transporter verified");

//     await transporter.sendMail({
//       from: `"Contact Form" <${process.env.EMAIL_USER}>`,
//       replyTo: email,
//       to: process.env.EMAIL_USER,
//       subject: "New User Details Submission",
//       html: `
//         <h3>User Details</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Mobile:</b> ${mobile}</p>
//         <p><b>Business:</b> ${business}</p>
//         <p><b>Location:</b> ${businessLocation}</p>
//       `,
//     });

//     console.log("✅ Email sent");
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("❌ Nodemailer error:", error.message);
//     res.status(500).json({ message: "Email failed", error: error.message });
//   }
// };




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