
// import chromium from "@sparticuz/chromium";
// import puppeteer from "puppeteer-core";

// export const createPDF = async (html) => {
//   let browser;

//   try {
//     browser = await puppeteer.launch({
//       args: chromium.args,
//       executablePath: await chromium.executablePath(),
//       headless: chromium.headless,
//       defaultViewport: chromium.defaultViewport,
//     });

//     const page = await browser.newPage();

//     // Wait for fonts to load properly
//     // await page.setContent(html, { waitUntil: "networkidle0" });
//     await page.setContent(html, { waitUntil: "domcontentloaded" }); // ✅ don't wait for network

//     const pdf = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: { top: "20px", bottom: "40px", left: "10px", right: "10px" },
//     });

//     return pdf;

//   } catch (error) {
//     console.error("❌ Puppeteer Error:", error.message);
//     throw error;
//   } finally {
//     if (browser) await browser.close();
//   }
// };


import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

let browserInstance = null;

const getBrowser = async () => {
  if (browserInstance) return browserInstance;

  browserInstance = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });

  browserInstance.on("disconnected", () => {
    browserInstance = null;
  });

  return browserInstance;
};

export const createPDF = async (html) => {
  try {
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "40px", left: "10px", right: "10px" },
    });

    await page.close(); // ✅ close page not browser

    return pdf;

  } catch (error) {
    browserInstance = null; // ✅ reset so next request launches fresh
    console.error("❌ Puppeteer Error:", error.message);
    throw error;
  }
};