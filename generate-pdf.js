#!/usr/bin/env node
// Generate PDF from resume HTML using Chrome headless via puppeteer-core
//
// Usage: node generate-pdf.js [input.html] [output.pdf]
// Defaults: resume-stackoverflow.html → resume.pdf

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function generatePDF(inputHtml, outputPdf) {
  const absoluteInput = path.resolve(inputHtml);
  if (!fs.existsSync(absoluteInput)) {
    console.error(`File not found: ${absoluteInput}`);
    process.exit(1);
  }

  const fileUrl = `file:///${absoluteInput.replace(/\\/g, '/')}`;
  console.log(`==> Opening ${inputHtml}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  await page.pdf({
    path: outputPdf,
    format: 'A4',
    margin: { top: '0.5cm', bottom: '0.5cm', left: '1cm', right: '1cm' },
    printBackground: true,
  });

  await browser.close();
  console.log(`==> PDF saved: ${outputPdf}`);
}

const input = process.argv[2] || 'resume-stackoverflow.html';
const output = process.argv[3] || 'resume.pdf';

generatePDF(input, output).catch((err) => {
  console.error('Error generating PDF:', err.message);
  process.exit(1);
});
