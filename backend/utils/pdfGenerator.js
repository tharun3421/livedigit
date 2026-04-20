import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export const createPDF = async (html) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
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