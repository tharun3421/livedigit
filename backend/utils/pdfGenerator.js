import puppeteer from "puppeteer";

export const createPDF = async (html) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",        // ✅ required for Render free tier
      "--no-zygote",             // ✅ required for Render free tier
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "70px", left: "0px", right: "0px" },
    });

    return pdf;
  } finally {
    await browser.close();
  }
};