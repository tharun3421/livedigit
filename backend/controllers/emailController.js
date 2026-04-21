// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// import { createPDF } from "../utils/pdfGenerator.js";
// import { sendQuotationEmail } from "../utils/mailer.js";

// export const generateAndSendEmail = async (req, res) => {
//   try {
//     console.log("✅ API HIT");

//     const { services, role, user } = req.body;

//     console.log("USER:", user);

//     if (!user?.email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     let total = 0;

//     const itemsHTML = services.map((s) => {
//       const price = s.pricing[role];
//       const qty = Number(s.quantity) || 1;
//       const itemTotal = price * qty;
//       total += itemTotal;

//       return `
//         <tr>
//           <td>${s.title}</td>
//           <td>${qty}</td>
//           <td>₹${price}</td>
//           <td>₹${itemTotal}</td>
//         </tr>
//       `;
//     }).join("");

//     const html = `
//       <html>
//         <body>
//           <h2>Quotation</h2>
//           <p>Name: ${user.name}</p>
//           <p>Email: ${user.email}</p>
//           <table border="1" width="100%">
//             ${itemsHTML}
//           </table>
//           <h3>Total: ₹${total}</h3>
//         </body>
//       </html>
//     `;

//     const pdfBuffer = await createPDF(html);

//     await sendQuotationEmail({ user, pdfBuffer });

//     res.json({ success: true });

//   } catch (err) {
//     console.error("❌ FULL ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };



import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { createPDF } from "../utils/pdfGenerator.js";
import { sendQuotationEmail } from "../utils/mailer.js";

export const generateAndSendEmail = async (req, res) => {
  try {
    const { services, role, user } = req.body;

    // ✅ Validation
    if (!user?.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // ✅ Path setup
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // ✅ Load logo
    const logoPath = path.join(__dirname, "../public/logo.png");
    const logoBase64 = fs.readFileSync(logoPath, "base64");

    let total = 0;

    // ✅ Generate items HTML
    const itemsHTML = services
      .map((s) => {
        const price = s.pricing[role];
        const qty = Number(s.quantity) || 1;
        const itemTotal = price * qty;
        total += itemTotal;

        return `
          <tr>
            <td>${s.title}</td>
            <td style="text-align:center;">${qty}</td>
            <td style="text-align:center;">₹${price.toLocaleString("en-IN")}</td>
            <td style="text-align:center;">₹${itemTotal.toLocaleString("en-IN")}</td>
          </tr>
        `;
      })
      .join("");

    const today = new Date().toLocaleDateString("en-IN");

    // ✅ FULL STYLED HTML (same as PDF controller)
    const html = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #222;
          }

          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          .items-table th {
            background: #2c3e50;
            color: white;
            padding: 10px;
          }

          .items-table td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }

          .total {
            text-align: right;
            font-size: 18px;
            margin-top: 20px;
            font-weight: bold;
          }
        </style>
      </head>

      <body>

        <div class="header">
          <div>
            <img src="data:image/png;base64,${logoBase64}" height="50"/>
          </div>
          <div>
            <strong>Date:</strong> ${today}
          </div>
        </div>

        <h2>Quotation</h2>

        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>

        <table class="items-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="total">
          Total: ₹${total.toLocaleString("en-IN")}
        </div>

      </body>
      </html>
    `;

    // ✅ Generate PDF
    const pdfBuffer = await createPDF(html);

    // ✅ Send Email
    await sendQuotationEmail({
      user,
      pdfBuffer,
    });

    return res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);

    return res.status(500).json({
      error: "Email failed",
      details: err.message,
    });
  }
};