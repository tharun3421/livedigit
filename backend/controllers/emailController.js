import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { createPDF } from "../utils/pdfGenerator.js";
import { sendQuotationEmail } from "../utils/mailer.js";

export const generateAndSendEmail = async (req, res) => {
  try {
    const { services, role, user } = req.body;

    if (!user?.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const logoPath = path.join(__dirname, "../public/logo.png");
    const logoBase64 = fs.readFileSync(logoPath, "base64");

    // ✅ SAME LOGIC AS YOUR PDF CONTROLLER
    let total = 0;

    const itemsHTML = services.map((s) => {
      const price = s.pricing[role];
      const qty = Number(s.quantity) || 1;
      const itemTotal = price * qty;
      total += itemTotal;

      return `
        <tr>
          <td>${s.title}</td>
          <td style="text-align:center;">${qty}</td>
          <td style="text-align:center;">₹${price}</td>
          <td style="text-align:center;">₹${itemTotal}</td>
        </tr>
      `;
    }).join("");

    const html = `
      <html>
        <body>
          <h2>Quotation</h2>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>

          <table border="1" width="100%" cellspacing="0" cellpadding="8">
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

          <h3>Total: ₹${total}</h3>
        </body>
      </html>
    `;

    // ✅ YOUR FUNCTION USED HERE
    const pdfBuffer = await createPDF(html);

    // ✅ SEND EMAIL
    await sendQuotationEmail({ user, pdfBuffer });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email failed" });
  }
};