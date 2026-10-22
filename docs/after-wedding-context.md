# Post-wedding page context

## Purpose

This repository contains two experiences in one site:

1. A post-wedding memory page, rendered by default.
2. The original wedding invitation, available with `?invitation`.

The new page is a continuation of the invitation rather than a separate brand. Its message is: “We got married; here is a small memory album about that day.”

## Entry points and routing

The memory page is the default, including for existing personalized links. Use `/?invitation` to open the original invitation; its personalization parameters still work.

The legacy `afterWedding` parameter still selects the memory page and takes precedence over `invitation`. Both switches use parameter presence, not their value:

```txt
/?afterWedding
/?afterWedding=true
/?afterWedding=1
```

The relevant files are:

| File | Responsibility |
| --- | --- |
| `index.html` | Adds the mode class synchronously to prevent a branch flash. |
| `src/index.pug` | Contains the invitation and post-wedding roots. |
| `src/index.ts` | Loads only the behavior needed by the active branch. |
| `src/components/after-wedding/index.pug` | Post-wedding semantic markup and copy. |
| `src/components/after-wedding/index.ts` | Elapsed-time calculation and Russian plural forms. |
| `src/components/after-wedding/style.scss` | Post-wedding design system and responsive layout. |
| `public/images/after-wedding/` | Final optimized illustration and icon assets. |
| `tests/e2e/after-wedding.spec.ts` | Deterministic section-level visual tests. |

The wedding time is:

```txt
2026-08-25T12:20:00+03:00
```

The post-wedding timer never changes into invitation/countdown language. Before the date it clamps to zero; after the date it shows elapsed days, hours, minutes, and seconds.

## Page structure

The page has seven independently testable blocks:

| Block | Selector | Visual role |
| --- | --- | --- |
| Hero | `.after-hero` | Dusty-pink announcement with the transparent couple illustration. |
| Timer | `.after-timer` | Pale-sage elapsed-time panel. |
| Story | `.after-story` | Warm-cream text and full restaurant illustration. |
| Day | `.after-day` | Four illustrated cards: wedding ransom with film link, ceremony at Wedding Palace No. 2, guest tour alongside the couple's photo session, and the restaurant celebration. |
| Gallery | `.after-gallery` | A note that professional photos and video are pending, plus links to guest photos and the wedding ransom film. |
| Honeymoon | `.after-honeymoon` | Pale-sage South Korea travel section with a link to the trip film. The photo album is private and must not be linked. |
| Thanks | `.after-thanks` | Dusty-pink closing message and link back to the wedding media. |

The external media links use the URLs supplied by the couple and open in a new tab. Only guest photos, the wedding ransom film, and the trip film are shared. The gallery illustrations are retained as assets but are not displayed as wedding photographs. Keep media descriptions and availability notes as HTML text.

## Design system

The original repository palette is defined in `src/styles/var.scss`. The post-wedding page normalizes it through CSS custom properties:

```css
--after-navy: #033f63;
--after-pink: #f2a1a8;
--after-pink-soft: #ffd3d5;
--after-sage: #ccd5ae;
--after-sage-soft: #e9edc9;
--after-cream: #fbefdd;
--after-cream-soft: #fff7ed;
--after-peach: #f8dfc2;
```

Use dark navy for text and line work rather than pure black. Backgrounds may use soft gradients, but they should remain quiet enough for the illustrations and copy.

Typography remains the existing Roboto/system sans-serif setup. Headings are bold, clean, and large; body text uses relaxed line height and must remain readable on a 390 px viewport.

## Responsive intent

Desktop:

- centered hero composition;
- two-column story section;
- four timeline cards in one row;
- two wedding media links side by side;
- honeymoon copy beside the trip film link.

Mobile:

- all major content stacks vertically;
- the story illustration comes before its text;
- the complete story scene remains visible at its natural 3:2 ratio;
- timeline cards become one column;
- media links stack vertically with comfortably sized tap targets;
- the four timer values stay on one row.

Do not make a mobile layout by merely shrinking the desktop composition. Inspect mobile section screenshots independently.

## Asset map

| Asset | Intended treatment |
| --- | --- |
| `hero-couple.png` | Transparent PNG, shown with `contain` behavior directly on pink. |
| `story-wedding-day.png` | 3:2 landscape illustration; always show the full scene without cropping. |
| `gallery-ceremony.webp` | Retained illustration; not currently rendered. |
| `gallery-walk.webp` | Retained illustration; not currently rendered. |
| `gallery-guests.webp` | Retained illustration; not currently rendered. |
| `gallery-details.webp` | Retained illustration; not currently rendered. |
| `gallery-evening.webp` | Retained illustration; not currently rendered. |
| `icons/*.svg` | Deterministic timeline illustrations. |

The characters, palette, line weight, flowers, and architectural treatment must remain consistent across every raster asset. See [the image quality guide](image-quality-guide.md) before producing or replacing images.

## Acceptance checklist

- The memory page renders without any mode parameter.
- The invitation still renders with `?invitation`, unless `afterWedding` is also present.
- All three supported parameter examples render the memory page.
- No invitation form behavior runs on the memory page.
- The timer uses the correct timestamp and Russian plural forms.
- All seven blocks remain visually coherent.
- Text is selectable HTML.
- No illustration contains readable generated text or watermarks.
- The story scene is fully visible on desktop and mobile.
- Wedding media clearly states that professional photos and video are pending.
- Guest photos, the wedding ransom film, and the trip film use the supplied links. The private honeymoon photo album is not linked.
- Desktop and mobile section snapshots have been inspected individually.
