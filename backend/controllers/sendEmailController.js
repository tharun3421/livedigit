import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  const { name, email, mobile, business, businessLocation } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com",
        pass: "your_app_password", // use app password (important)
      },
    });

    const mailOptions = {
      from: email,
      to: "yourgmail@gmail.com",
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
    console.error(error);
    res.status(500).json({ message: "Email failed" });
  }
};