#!/usr/bin/env node
/**
 * WCAG 2.1 contrast check for WHO design tokens (AA).
 * Run: npm run a11y:contrast
 * Fails the build when token pairs fall below required ratios.
 */

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground, background) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** WHO theme tokens — keep in sync with app/globals.css [data-theme='who'] */
const TOKENS = {
  background: "#0a0a0a",
  surface: "#141414",
  body: "#ededed",
  secondary: "#c8c8c8",
  muted: "#a3a3a3",
  placeholder: "#858585",
  accentGreen: "#00f21d",
  accentCyan: "#05a3f8",
  textOnGreen: "#0a0a0a",
};

const PAIRS = [
  { fg: TOKENS.body, bg: TOKENS.background, label: "body on background", min: AA_NORMAL },
  { fg: TOKENS.secondary, bg: TOKENS.background, label: "secondary on background", min: AA_NORMAL },
  { fg: TOKENS.muted, bg: TOKENS.background, label: "muted/tertiary on background", min: AA_NORMAL },
  { fg: TOKENS.placeholder, bg: TOKENS.background, label: "placeholder on background", min: AA_NORMAL },
  { fg: TOKENS.secondary, bg: TOKENS.surface, label: "secondary on surface", min: AA_NORMAL },
  { fg: TOKENS.muted, bg: TOKENS.surface, label: "muted on surface", min: AA_NORMAL },
  { fg: TOKENS.textOnGreen, bg: TOKENS.accentGreen, label: "primary button text", min: AA_NORMAL },
  { fg: TOKENS.accentCyan, bg: TOKENS.background, label: "link on background", min: AA_NORMAL },
  { fg: TOKENS.body, bg: TOKENS.surface, label: "body on surface", min: AA_NORMAL },
];

let failed = false;

console.log("WHO contrast token check (WCAG 2.1 AA)\n");

for (const { fg, bg, label, min } of PAIRS) {
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= min;
  const status = pass ? "PASS" : "FAIL";
  console.log(
    `${status}  ${label}: ${ratio.toFixed(2)}:1 (need ${min}:1)  ${fg} on ${bg}`,
  );
  if (!pass) failed = true;
}

if (failed) {
  console.error("\nContrast check failed. Adjust tokens in app/globals.css.");
  process.exit(1);
}

console.log("\nAll token pairs pass WCAG 2.1 AA for normal text.");
