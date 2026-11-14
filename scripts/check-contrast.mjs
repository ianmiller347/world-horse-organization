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

/**
 * WHO theme tokens — keep in sync with app/globals.css.
 * Each light-dark(light, dark) value there splits into these two palettes.
 */
const THEMES = {
  dark: {
    background: "#0a0a0a",
    surface: "#141414",
    surfaceAlt: "#1a1a1a",
    body: "#ededed",
    secondary: "#c8c8c8",
    muted: "#a3a3a3",
    placeholder: "#858585",
    buttonBg: "#00f21d",
    buttonText: "#0a0a0a",
    link: "#05a3f8",
    green: "#00f21d",
    yellow: "#faf412",
    red: "#f23d1f",
    orange: "#fb8a16",
  },
  light: {
    background: "#fafafa",
    surface: "#ffffff",
    surfaceAlt: "#f4f4f5",
    body: "#171717",
    secondary: "#404040",
    muted: "#595959",
    placeholder: "#6b6b6b",
    buttonBg: "#13792f",
    buttonText: "#ffffff",
    link: "#0369a1",
    green: "#13792f",
    yellow: "#8a5a00",
    red: "#b91c1c",
    orange: "#b0440a",
  },
};

function pairsFor(t) {
  return [
    { fg: t.body, bg: t.background, label: "body on background", min: AA_NORMAL },
    { fg: t.secondary, bg: t.background, label: "secondary on background", min: AA_NORMAL },
    { fg: t.muted, bg: t.background, label: "muted/tertiary on background", min: AA_NORMAL },
    { fg: t.placeholder, bg: t.background, label: "placeholder on background", min: AA_NORMAL },
    { fg: t.body, bg: t.surface, label: "body on surface", min: AA_NORMAL },
    { fg: t.secondary, bg: t.surface, label: "secondary on surface", min: AA_NORMAL },
    { fg: t.muted, bg: t.surface, label: "muted on surface", min: AA_NORMAL },
    { fg: t.muted, bg: t.surfaceAlt, label: "muted on surface-alt", min: AA_NORMAL },
    { fg: t.buttonText, bg: t.buttonBg, label: "primary button text", min: AA_NORMAL },
    { fg: t.link, bg: t.background, label: "link on background", min: AA_NORMAL },
    { fg: t.link, bg: t.surface, label: "link on surface", min: AA_NORMAL },
    { fg: t.green, bg: t.background, label: "color-green text", min: AA_NORMAL },
    { fg: t.yellow, bg: t.background, label: "color-yellow text", min: AA_NORMAL },
    { fg: t.red, bg: t.background, label: "color-red text", min: AA_NORMAL },
    { fg: t.orange, bg: t.background, label: "color-orange text", min: AA_NORMAL },
  ];
}

let failed = false;

console.log("WHO contrast token check (WCAG 2.1 AA)");

for (const [name, tokens] of Object.entries(THEMES)) {
  console.log(`\n${name} theme`);
  for (const { fg, bg, label, min } of pairsFor(tokens)) {
    const ratio = contrastRatio(fg, bg);
    const pass = ratio >= min;
    const status = pass ? "PASS" : "FAIL";
    console.log(
      `${status}  ${label}: ${ratio.toFixed(2)}:1 (need ${min}:1)  ${fg} on ${bg}`,
    );
    if (!pass) failed = true;
  }
}

if (failed) {
  console.error("\nContrast check failed. Adjust tokens in app/globals.css.");
  process.exit(1);
}

console.log("\nAll token pairs pass WCAG 2.1 AA for normal text.");
