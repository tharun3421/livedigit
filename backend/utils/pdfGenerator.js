import puppeteer from "puppeteer";

export const createPDF = async (html) => {
  let browser;

  try {
    console.log("🚀 Launching browser...");

    browser = await puppeteer.launch({
      headless: true, // ✅ stable
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    console.log("✅ Browser launched");

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "domcontentloaded", // ✅ safer
    });

    // ✅ Debug step (VERY IMPORTANT)
    await page.screenshot({ path: "debug.png" });

    console.log("📸 Screenshot taken");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "40px",
        left: "10px",
        right: "10px",
      },
    });

    console.log("✅ PDF generated");

    return pdf;
  } catch (error) {
    console.error("❌ Puppeteer Error:", error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
};