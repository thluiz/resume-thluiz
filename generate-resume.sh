#!/bin/bash
# Generate resume HTML from jsonresume.json with stackoverflow theme
# Applies post-processing fixes: light mode, full skill bars, print layout
#
# Usage: bash generate-resume.sh
# Prerequisites: npm install -g resume-cli && npm install jsonresume-theme-stackoverflow

set -e
cd "$(dirname "$0")"

RESUME_JSON="data/jsonresume.json"
OUTPUT_HTML="resume-stackoverflow.html"
THEME="stackoverflow"

echo "==> Generating HTML with theme: $THEME"
resume export "$OUTPUT_HTML" --theme "$THEME" --resume "$RESUME_JSON"

echo "==> Applying post-processing fixes..."

# 1. Remove dark mode (theme follows OS prefers-color-scheme)
sed -i 's|/\* Variables (dark) \*/|/* Dark mode disabled — forced light */|' "$OUTPUT_HTML"
# Remove the @media block for dark mode
python3 -c "
import re
with open('$OUTPUT_HTML', 'r', encoding='utf-8') as f:
    content = f.read()
# Remove @media (prefers-color-scheme: dark) { :root { ... } }
content = re.sub(
    r'@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{[^}]*\}\s*\}',
    '',
    content
)
with open('$OUTPUT_HTML', 'w', encoding='utf-8') as f:
    f.write(content)
"

# 2. Fix language bars — theme only recognizes: beginner, intermediate, advanced, master
# "Full Proficiency" generates class "full proficiency" which has no style
sed -i 's|class="level full proficiency svelte-10tjtrd"|class="level master svelte-10tjtrd"|g' "$OUTPUT_HTML"
# Force Spanish (intermediate) bar to full as well
sed -i 's|class="level intermediate svelte-10tjtrd"|class="level master svelte-10tjtrd"|g' "$OUTPUT_HTML"

# 3. Fix print layout — show bars, avoid page breaks cutting sections
sed -i 's|@media print {|@media print {\n  .level .bar { display: block !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n  .timeline-item, .language-entry, .interest-item { break-inside: avoid; page-break-inside: avoid; }|' "$OUTPUT_HTML"

# 4. Reduce print margins
sed -i 's|@page { margin: 1cm 1.4cm; }|@page { margin: 0.5cm 1cm; }|' "$OUTPUT_HTML"

echo "==> Done! Output: $OUTPUT_HTML"
echo "    Open in browser and use Ctrl+P > Save as PDF"
