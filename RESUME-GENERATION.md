# Resume Generation Guide

## Files

| File | Purpose |
|------|---------|
| `data/profile.json` | Source data for the Gatsby site (resume.thluiz.com) |
| `data/jsonresume.json` | Source data for JSON Resume (PDF/HTML export) |
| `static/profile-podcast.png` | Avatar image (podcast photo) |
| `generate-resume.sh` | Script to generate and fix the HTML |
| `resume-stackoverflow.html` | Generated output (DO NOT edit manually) |

## Quick Generate

```bash
bash generate-resume.sh
```

Then open `resume-stackoverflow.html` in browser → Ctrl+P → Save as PDF.

## Manual Steps (if script fails)

### 1. Install dependencies (first time only)

```bash
npm install -g resume-cli
npm install jsonresume-theme-stackoverflow
```

### 2. Generate HTML

```bash
resume export resume-stackoverflow.html --theme stackoverflow --resume data/jsonresume.json
```

### 3. Post-processing fixes needed

The generated HTML needs these manual fixes every time:

#### Remove dark mode
The theme uses `@media (prefers-color-scheme: dark)` which follows OS theme.
Delete the entire `@media (prefers-color-scheme: dark) { :root { ... } }` block from the CSS.

#### Fix language bars
The theme only recognizes CSS classes: `beginner`, `intermediate`, `advanced`, `master`.
Custom fluency values like "Full Proficiency" generate invalid class names → white bars.
Replace `class="level full proficiency svelte-10tjtrd"` with `class="level master svelte-10tjtrd"`.
Same for `intermediate` if you want full bars on all languages.

#### Fix print layout
Add to the `@media print` block:
```css
.level .bar { display: block !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
section, .timeline-item, .skill-item, .language-entry, .interest-item {
  break-inside: avoid; page-break-inside: avoid;
}
h2, h3 { break-after: avoid; page-break-after: avoid; }
```
Change `@page { margin: 1cm 1.4cm; }` to `@page { margin: 0.5cm 1cm; }`.

## Other Themes Tested

| Theme | Verdict |
|-------|---------|
| `kendall` | Good, but PDF page breaks cut content |
| `elegant` | Nice sidebar, but needs `picture` field (not `image`), icons need serve |
| `stackoverflow` | **Winner** — clean, good fonts, light mode with fix |
| `class` | Broken layout |

## Notes

- The avatar image must be accessible via URL for PDF export. For local generation, temporarily serve via `python -m http.server 8888` from `static/` dir and point image to `http://localhost:8888/profile-podcast.png`.
- After deploying `static/profile-podcast.png` to the site, the URL `https://resume.thluiz.com/profile-podcast.png` will work directly.
- Keep both `image` and `picture` fields in jsonresume.json — different themes use different field names.
