import nodemailer from "nodemailer";

export const sendQuotationEmail = async ({ user, pdfBuffer }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Live Digit" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Your Quotation",
    html: `<p>Hi ${user.name}, your quotation is attached.</p>`,
    attachments: [
      {
        filename: "quotation.pdf",
        content: pdfBuffer,
      },
    ],
  });
};