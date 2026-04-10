# Ply vs Tailwind — Gap Tracker

Tracking Tailwind utilities that ply-css doesn't cover. Each time we convert a
page from Tailwind to ply and hit a missing class, it lands here. This file is
the source of truth for what a future ply PR or custom utility layer would need.

## Status

- **ply version:** 1.6.1
- **Tailwind version:** 4 (still imported globally for non-ply pages)
- **Pages converted:** `app/free-the-horses/page.tsx`

## Gap Categories

### 1. Axis-specific padding/margin

Ply has `padding-lg` (all sides) and `padding-left-lg` etc., but no shorthand
for horizontal (`px-*`) or vertical (`py-*`) pairs.

| Tailwind | What it does | Workaround |
|----------|-------------|------------|
| `px-6` | padding-left + right: 1.5rem | CSS module or two ply classes (`padding-left-lg padding-right-lg`) |
| `py-16` | padding-top + bottom: 4rem | CSS module (ply maxes out at `padding-xxl` = 3rem) |

### 2. Max-width utilities

Ply has `units-container` (1200px max) but no arbitrary max-widths.

| Tailwind | What it does | Workaround |
|----------|-------------|------------|
| `max-w-3xl` | max-width: 48rem | CSS module |
| `max-w-md` | max-width: 28rem | CSS module |

### 3. Centering (non-grid)

Ply has `centered` and `unit-centered` but only inside `units-row`. No generic
`mx-auto` for arbitrary block elements.

| Tailwind | What it does | Workaround |
|----------|-------------|------------|
| `mx-auto` | margin-left/right: auto | CSS module or inline style |

### 4. Stacked spacing (`space-y-*`)

Ply has gap utilities (`gap-sm`, `gap-lg`, etc.) for flex/grid children, but no
`space-y-*` that applies margin-top to sibling elements in flow layout.

| Tailwind | What it does | Workaround |
|----------|-------------|------------|
| `space-y-2` | `> * + * { margin-top: 0.5rem }` | CSS module (`.stack2`) |
| `space-y-4` | `> * + * { margin-top: 1rem }` | CSS module (`.stack4`) |
| `space-y-6` | `> * + * { margin-top: 1.5rem }` | CSS module (`.stack6`) |
| `space-y-8` | `> * + * { margin-top: 2rem }` | CSS module (`.stack8`) |

### 5. Letter-spacing

No letter-spacing utilities in ply.

| Tailwind | What it does | Workaround |
|----------|-------------|------------|
| `tracking-tight` | letter-spacing: -0.025em | CSS module |
| `tracking-widest` | letter-spacing: 0.1em | CSS module |

### 6. Responsive text sizing

Ply has `text-xs` through `text-5xl` but no responsive prefixes for them.

| Tailwind | What it does | Workaround |
|----------|-------------|------------|
| `sm:text-5xl` | text-5xl at ≥640px | CSS module media query |

### 7. Hover/transition utilities

Ply has no `hover:*` prefix system or transition utilities.

| Tailwind | What it does | Workaround |
|----------|-------------|------------|
| `hover:text-foreground/60` | Color change on hover | CSS module |
| `hover:bg-white/90` | Background opacity on hover | CSS module |
| `transition-colors` | Smooth color transitions | CSS module |

### 8. Opacity-based colors

Tailwind's `text-foreground/40` syntax (color at specific opacity) has no
ply equivalent. Ply uses semantic tiers instead (`text-secondary`,
`text-tertiary`).

| Tailwind | Ply equivalent | Notes |
|----------|---------------|-------|
| `text-foreground/40` | `text-tertiary` | Close but not exact; ply maps to `--ply-color-muted` |
| `text-foreground/70` | `text-secondary` | Close; maps to `--ply-color-secondary` |
| `text-foreground/80` | `text-secondary` | Same mapping, slightly different shade |
| `text-foreground/30` | `text-tertiary` | Same mapping |
| `bg-foreground/[0.03]` | `bg-surface` | Ply surface is a solid color, not transparency |

### 9. Flex utilities

| Tailwind | What it does | Workaround |
|----------|-------------|------------|
| `flex-wrap` | flex-wrap: wrap | Inline style or CSS module (ply only wraps inside `units-row`) |
| `shrink-0` | flex-shrink: 0 | CSS module (`.noShrink`) |

### 10. Specific background/text colors

| Tailwind | Ply equivalent | Notes |
|----------|---------------|-------|
| `bg-white` | — | Use `btn-primary` with custom theme, or inline style |
| `text-black` | `color-black` | Direct match |
| `text-emerald-400` | `color-green` | Ply green is different hue than Tailwind emerald |
| `text-yellow-400` | `color-yellow` | Close match |

### 11. Border with custom color

| Tailwind | Ply equivalent | Notes |
|----------|---------------|-------|
| `border-foreground/10` | `border` | Ply uses `--ply-border-color` which we set to match in WHO theme |

### 12. Rounded-full (pill shape)

| Tailwind | Ply equivalent | Notes |
|----------|---------------|-------|
| `rounded-full` | `circle` | `circle` does `border-radius: 100%`. For pills, use `border-radius-xl` |

## Impact & Efficiency Analysis

### Bundle size

| Metric | Tailwind only | Tailwind + Ply |
|--------|--------------|----------------|
| Total CSS (minified) | 22 KB (1 chunk) | 154 KB (3 chunks) |
| Total CSS (gzipped) | 5.0 KB | 26.2 KB |
| Ply standalone (gzipped) | — | 21 KB |

Adding ply increases the CSS payload by ~21 KB gzipped. That's the full ply
bundle — grid, buttons, forms, navigation, notifications, labels, loaders, and
helpers. Most of it is unused on any single page. If this becomes a concern,
ply ships leaner bundles:

- `ply-core.min.css` — ~17 KB gzip (grid, buttons, forms, nav, typography, helpers)
- `ply-essentials.min.css` — ~7 KB gzip (grid + helpers only)
- `ply-helpers.min.css` — ~5 KB gzip (just utility classes)

For a content-heavy page like Free the Horses, `ply-core` or even
`ply-helpers` would cover everything we need and cut the overhead to 5–17 KB.

Once Tailwind is fully removed from a page (or the whole app), the net CSS
drops significantly — Tailwind's 5 KB gzip goes away and ply core replaces it
at 17 KB, so the real overhead is ~12 KB for a much simpler authoring model.

### Class count on `free-the-horses/page.tsx`

| Source | Class references | Notes |
|--------|-----------------|-------|
| Ply classes | ~41 | Typography, layout, borders, buttons, colors |
| CSS module (gap workarounds) | ~39 | 10 custom classes covering 12 gap categories |
| Tailwind classes remaining | 0 | Fully migrated off Tailwind on this page |
| Inline styles | 1 | `flexWrap: "wrap"` (gap #9) |

The CSS module that fills ply's gaps is 1 KB — 10 classes. That's a thin
layer. By comparison, the original Tailwind version used ~45 unique utility
classes with no additional CSS files.

### Developer experience

| Factor | Tailwind | Ply | Notes |
|--------|----------|-----|-------|
| Discoverability | Docs + IDE plugin | `ply-classes.json` + PLY.md | Ply's JSON reference is machine-searchable; good for AI-assisted dev |
| Class naming | Terse (`px-6`, `mt-4`) | Verbose (`padding-left-lg`, `margin-top`) | Ply is more readable in markup; Tailwind is faster to type |
| Arbitrary values | `text-[#abc]`, `max-w-[48rem]` | Not supported | Tailwind wins for one-off overrides |
| Responsive prefixes | `sm:`, `md:`, `lg:` on anything | `tablet-unit-*`, `phone-unit-*` on grid only | Tailwind's responsive system is far more flexible |
| Dark mode | `dark:` prefix | Automatic via `prefers-color-scheme` + `data-theme` | Ply's approach is zero-config; Tailwind gives per-element control |
| Accessibility | Manual (no defaults) | WCAG AA focus rings, reduced motion, high contrast | Ply ships accessible defaults out of the box |
| Bundle | Tree-shaken per-class | Fixed bundle (21 KB full, 5–17 KB subsets) | Tailwind only ships what you use; ply ships everything in the chosen bundle |
| JS runtime | 0 KB | 0 KB | Both are pure CSS |

### Semantic color approach

Ply's `text-secondary` / `text-tertiary` vs Tailwind's `text-foreground/70`
represents a philosophical difference. Tailwind gives precise control (any
opacity). Ply enforces a design system (3 tiers of text hierarchy). For a
branded product like WHO, the semantic approach is arguably better — fewer
decisions, more consistent output. The tradeoff is losing the ability to
fine-tune opacity without dropping to custom CSS.

### When to use which

| Scenario | Recommendation |
|----------|---------------|
| New content/marketing pages | Ply + CSS module for gaps |
| Existing app pages (stable, races, leaderboard) | Keep Tailwind for now, migrate incrementally |
| Components shared across pages | Stay on Tailwind until full migration |
| Accessibility-critical features | Ply (built-in WCAG AA) |
| Rapid prototyping with arbitrary values | Tailwind |

### Path to full migration

1. Convert remaining pages one at a time, starting with static/content pages
2. Build a shared `who-utilities.css` to replace per-page CSS modules once
   patterns stabilize (the `.stack*`, `.noShrink`, `.pageContainer` classes
   are already reusable)
3. Once all pages are converted, drop `@import "tailwindcss"` from
   `globals.css` and remove the Tailwind dependency
4. File ply feature requests for the highest-impact gaps (axis padding,
   space-y, responsive text, hover/transition)

## Summary

**What ply handles well:** Typography sizes/weights, line-height, grid layout,
padding/margin (all-sides and single-side), borders, border-radius, flex
display + alignment, gap, semantic text color tiers, buttons, dark mode,
accessibility defaults.

**Biggest gaps for our use case:** Axis-specific padding, stacked spacing,
letter-spacing, hover/transition states, responsive text sizing, arbitrary
max-widths, opacity-based colors.

**Bottom line:** Ply covers ~51% of class references on the converted page with
zero custom CSS. The remaining 49% are thin layout utilities handled by a 1 KB
CSS module. The authoring model is more readable and ships accessible defaults
that Tailwind doesn't. The cost is a larger fixed CSS bundle (~21 KB gzip) and
a less flexible responsive/hover system. For WHO's content-heavy pages, the
tradeoff is worth it. For complex interactive pages, evaluate per-page.
