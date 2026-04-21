import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { createPDF } from "../utils/pdfGenerator.js";
import { sendQuotationEmail } from "../utils/mailer.js";

export const generateAndSendEmail = async (req, res) => {
  try {
    console.log("✅ API HIT");

    const { services, role, user } = req.body;

    console.log("USER:", user);

    if (!user?.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let total = 0;

    const itemsHTML = services.map((s) => {
      const price = s.pricing[role];
      const qty = Number(s.quantity) || 1;
      const itemTotal = price * qty;
      total += itemTotal;

      return `
        <tr>
          <td>${s.title}</td>
          <td>${qty}</td>
          <td>₹${price}</td>
          <td>₹${itemTotal}</td>
        </tr>
      `;
    }).join("");

    const html = `
      <html>
        <body>
          <h2>Quotation</h2>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
          <table border="1" width="100%">
            ${itemsHTML}
          </table>
          <h3>Total: ₹${total}</h3>
        </body>
      </html>
    `;

    const pdfBuffer = await createPDF(html);

    await sendQuotationEmail({ user, pdfBuffer });

    res.json({ success: true });

  } catch (err) {
    console.error("❌ FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};