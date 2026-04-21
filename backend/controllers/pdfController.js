import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createPDF } from "../utils/pdfGenerator.js";

export const generatePDF = async (req, res) => {

  const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


  try {
    const { services, role, user } = req.body;
    const logoPath = path.join(__dirname, "../public/logo.png");
    const logoBase64 = fs.readFileSync(logoPath, "base64");
    let total = 0;

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
            <td style="text-align:center;">&#8377;${price.toLocaleString("en-IN")}/-</td>
            <td style="text-align:center;">&#8377;${itemTotal.toLocaleString("en-IN")}/-</td>
          </tr>
        `;
      })
      .join("");

    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const html = `
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', Arial, sans-serif;
            font-size: 13px;
            color: #222;
            background: #fff;
            padding: 40px;
          }

          /* ── TOP HEADER ── */
          .top-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 24px;
          }

          .logo-block {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .logo-icon {
            width: auto;
            height: 44px;
          }

          .brand-name {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0.5px;
            color: #111;
          }

          .brand-tagline {
            font-size: 11px;
            color: #666;
          }

          .date-block {
            text-align: right;
            font-size: 13px;
            font-weight: 600;
            color: #333;
          }

          /* ── COMPANY + CUSTOMER INFO ── */
          .info-section {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 28px;
            gap: 10px;
          }

          .company-info {
             text-align: left;
            font-size: 12px;
            color: #444;
            line-height: 1.7;
          }

          .company-info .company-title {
            font-size: 16px;
            font-weight: 700;
            color: #111;
            letter-spacing: 0.3px;
            margin-bottom: 4px;
          }

          .customer-info {
            text-align: right;
            font-size: 8px;
            color: #444;
            line-height: 1.7;
          }
          .customer-info td {
            padding-bottom: 5px;
            font-size: 12px;
            color: #444;
          }

          .customer-info p {
            margin: 0;
          }

          /* ── ITEMS TABLE ── */
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0;
            border-radius: 8px;
            overflow: hidden;
          }

          .items-table thead tr {
            background-color: #2c3e50;
            color: #fff;
          }

          .items-table thead th {
            padding: 12px 16px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            text-align: left;
          }

          .items-table thead th:not(:first-child) {
            text-align: center;
          }

          .items-table tbody tr {
            background: #f9f9f9;
            border-bottom: 1px solid #e8e8e8;
          }

          .items-table tbody tr:nth-child(even) {
            background: #fff;
          }

          .items-table tbody td {
            padding: 14px 16px;
            font-size: 13px;
            color: #333;
            vertical-align: middle;
          }

          /* ── TOTAL ROW ── */
          .total-row {
            width: 100%;
            border-top: 2px solid #2c3e50;
          }

          .total-row td {
            padding: 14px 16px;
          }

          .total-label {
            font-size: 14px;
            font-weight: 700;
            text-align: center;
            color: #111;
            letter-spacing: 0.5px;
          }

          .total-amount {
            font-size: 20px;
            font-weight: 800;
            text-align: center;
            color: #111;
          }

          /* ── FOOTER ── */
          .footer-section {
            display: flex;
            justify-content: space-between;
            margin-top: 36px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            gap:250px;
          }

          .footer-col {
            flex: 1;
          }

          .footer-col h4 {
            font-size: 12px;
            font-weight: 700;
            color: #111;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .footer-col p {
            font-size: 12px;
            color: #555;
            line-height: 1.7;
            margin: 0;
          }

          .footer-col a,
          .footer-col .link {
            color: #2c3e50;
            font-weight: 600;
          }

         /* ── NOTE SECTION ── */
.note-section {
  margin-top: 28px;
  padding: 14px 18px;
  background: #fffbe6;
  border-left: 4px solid #f5a623;
  border-radius: 4px;
}

.note-section h4 {
  font-size: 12px;
  font-weight: 700;
  color: #111;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.note-section ul {
  margin: 0;
  padding-left: 18px;
}

.note-section ul li {
  font-size: 12px;
  color: #555;
  line-height: 1.8;
}

/* ── BOTTOM CONTACT BAR (pinned to bottom) ── */
.contact-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 40px;
  background: #f2f2f2;
  border-top: 1px solid #ddd;
  font-size: 12px;
  color: #444;
}

.contact-bar span {
  font-weight: 500;
}

/* Add bottom padding to body so content doesn't hide behind fixed bar */
body {
  padding-bottom: 60px;
}
        </style>
      </head>

      <body>

        <!-- TOP HEADER -->
        <div class="top-header">
          <div class="logo-block">
            <!-- Livedigit-style play-bar SVG icon -->
        <div class="logo-icon">      <img 
      src="data:image/png;base64,${logoBase64}" 
      class="logo-icon"
    /></div>
   
          </div>
          <div class="date-block">DATE: ${today}</div>
        </div>

        <!-- COMPANY + CUSTOMER INFO -->
        <div class="info-section">
          <div class="company-info">
            <div class="company-title">LIVE DIGIT SERVICES</div>
            Flat No: 311, 4th Floor, RBR Complex,<br/>
            Miyapur, HYD - 500049
          </div>
       <div class="customer-info">
  <table style="margin-left: auto; text-align: left; border-collapse: collapse;">
    <tr style="line-height: 2;">
      <td style="font-weight: 600; padding-right: 7px; white-space: nowrap;">Customer Name:</td>
      <td>${user.name}</td>
    </tr>
    <tr style="line-height: 2;">
      <td style="font-weight: 600; padding-right: 7px; white-space: nowrap;">Mobile:</td>
      <td>${user.mobile}</td>
    </tr>
    <tr style="line-height: 2;">
      <td style="font-weight: 600; padding-right: 7px; white-space: nowrap;">Business:</td>
      <td>${user.business}</td>
    </tr>
    <tr style="line-height: 2;">
      <td style="font-weight: 600; padding-right: 7px; white-space: nowrap;">Business Location:</td>
      <td>${user.businessLocation}</td>
    </tr>
  </table>
</div>
  </table>
</div>
        </div>

        <!-- ITEMS TABLE -->
        <table class="items-table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th>QTY</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <!-- TOTAL -->
        <table class="total-row">
          <tr>
            <td style="width:60%;"></td>
            <td class="total-label">TOTAL</td>
            <td class="total-amount">&#8377; ${total.toLocaleString("en-IN")}/-</td>
          </tr>
        </table>

        <!-- FOOTER -->
        <div class="footer-section">
          <div class="footer-col">
            <h4>Payable To</h4>
            <p>Livedigit Services</p>
          </div>
          <div class="footer-col">
            <h4>Bank Details</h4>
            <p>
              UPI Number: 9177892897
            </p>
            <p>
              UPI ID: 9177892897-6@ybl
            </p>
            <p style="margin-top:8px;">
              <strong>Authorised Person:</strong> Livedigit Digital Marketing Services
            </p>
          </div>
        </div>

        <div class="note-section">
  <h4>Note</h4>
  <ul>
    <li>Services will be discontinued after plan completion. Please renew before expiry to avoid service interruption.</li>
    <li>Ad budget is not included in the package cost — it will be paid separately by the client based on daily or weekly requirements.</li>
  </ul>
</div>

<!-- CONTACT BAR -->
<div class="contact-bar">
  <span>&#128222; +91 9177954464</span>
  <span>&#127760; www.livedigit.in</span>
  <span>&#9993; support@livedigit.in</span>
</div>

      </body>
      </html>
    `;

    const pdf = await createPDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=quotation.pdf",
    });

    res.send(pdf);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating PDF" });
  }
};


