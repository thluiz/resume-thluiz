#!/bin/bash
# Generate resume HTML + PDF from jsonresume.json
# Applies post-processing fixes: light mode, full skill bars, print layout
#
# Usage: bash generate-resume.sh
# Prerequisites: npm install -g resume-cli && npm install jsonresume-theme-stackoverflow puppeteer-core

set -e
cd "$(dirname "$0")"

RESUME_JSON="data/jsonresume.json"
OUTPUT_HTML="resume-stackoverflow.html"
OUTPUT_PDF="resume.pdf"
THEME="stackoverflow"

echo "==> Generating HTML with theme: $THEME"
resume export "$OUTPUT_HTML" --theme "$THEME" --resume "$RESUME_JSON"

echo "==> Applying post-processing fixes..."
node -e "
const fs = require('fs');
const f = '$OUTPUT_HTML';
let c = fs.readFileSync(f, 'utf-8');

// 1. Remove dark mode
c = c.replace(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{[^}]*\}\s*\}/g, '');

// 2. Fix language bars
c = c.replace(/class=\"level full proficiency svelte-10tjtrd\"/g, 'class=\"level master svelte-10tjtrd\"');
c = c.replace(/class=\"level intermediate svelte-10tjtrd\"/g, 'class=\"level master svelte-10tjtrd\"');

// 3. Fix print layout
c = c.replace(/@media print \{/, '@media print {\n  .level .bar { display: block !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n  .timeline-item, .language-entry, .interest-item { break-inside: avoid; page-break-inside: avoid; }');

// 4. Reduce print margins
c = c.replace(/@page \{ margin: 1cm 1.4cm; \}/, '@page { margin: 0.5cm 1cm; }');

fs.writeFileSync(f, c, 'utf-8');
console.log('Post-processing done!');
"

echo "==> Generating PDF with Chrome headless..."
node generate-pdf.js "$OUTPUT_HTML" "$OUTPUT_PDF"

echo "==> All done!"
echo "    HTML: $OUTPUT_HTML"
echo "    PDF:  $OUTPUT_PDF"
