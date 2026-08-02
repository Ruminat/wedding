# Image quality guide

This is the production guide for generating, reviewing, processing, and integrating imagery for the post-wedding page. Image work is not complete when a generation looks attractive in isolation. It is complete only when the asset belongs naturally to the site, survives its real CSS crop, and passes desktop and mobile visual review.

## 1. Start from the slot, not the prompt

Before generating anything, identify the exact UI slot:

| Slot | Target shape | Cropping policy | Important safe area |
| --- | --- | --- | --- |
| Hero couple | Portrait cutout | No crop; transparent or seamlessly blended | Faces, bouquet, veil, and both bodies |
| Story scene | 3:2 landscape | Show the complete image | Entire table group and architecture |
| Ceremony | Wide landscape | Controlled gallery crop allowed | Couple and joined hands near center |
| Walk | 4:3 landscape | Controlled gallery crop allowed | Couple, joined hands, lamp, and skyline |
| Guests | 4:3 landscape | Controlled gallery crop allowed | Faces and raised glasses |
| Details | 4:3 landscape | Controlled gallery crop allowed | Both rings, box, bouquet, blank card |
| Evening | 4:3 landscape | Controlled gallery crop allowed | Both faces, glasses, and centerpiece |

Generate for the final aspect ratio. Do not generate a square and hope CSS can rescue it later.

## 2. Use one shared style bible

Every prompt must repeat the same core visual specification. Treat it as a locked design system:

```txt
Soft pastel post-wedding website illustration.
Cute minimal hand-drawn flat style with thin soft dark-navy outlines.
Rounded shapes and calm expressions.
Dusty pink, pale sage green, warm cream, and beige palette.
Airy composition, restrained detail, low contrast, no glossy rendering.
No text, captions, names, logos, watermark, photorealism, or 3D.
```

When reference screenshots are available, label them explicitly as style references rather than edit targets. The model should borrow palette, line weight, softness, spacing, and mood—not reproduce a screenshot or embed its page layout into an image.

Current section-level snapshots under `tests/e2e/after-wedding.spec.ts-snapshots/` are the repository-owned visual reference for how assets should look after integration.

## 3. Lock character consistency

Repeat the complete character description in every scene. Do not rely on “same couple as before” without restating their defining traits.

Bride:

- light skin;
- long light-brown or ginger-blonde hair;
- simple white dress with short puff sleeves;
- white veil;
- small pearl or floral headpiece;
- soft blush cheeks;
- bouquet of pale-pink and white flowers with sage greenery.

Groom:

- light skin;
- short brown hair;
- beige or tan suit;
- white shirt;
- sage or dark-green bow tie;
- small pink boutonniere;
- soft blush cheeks.

Keep face proportions, hair color, clothing shapes, flower palette, and outline weight stable. Reject an otherwise attractive image if it makes the couple look like different people or moves into a different illustration style.

## 4. Generate one final asset per prompt

Never ask for a whole website, multiple gallery scenes, a sprite sheet, or all icons in one generated image.

Use separate calls for:

1. hero couple;
2. story scene;
3. ceremony;
4. walk;
5. guests;
6. details;
7. evening.

Why this matters:

- anatomy and faces receive more attention;
- composition can match the destination crop;
- one weak scene can be regenerated without changing the others;
- style drift is easier to detect;
- text artifacts and accidental collage borders are less likely.

Simple icons should remain hand-authored SVG rather than generated bitmaps.

## 5. Prompt structure

Use a compact, production-oriented prompt:

```txt
Use case: illustration-story
Asset type: <hero cutout / story illustration / gallery image>
Input images: Images 1–3 are style references only.
Primary request: <one scene, stated plainly>
Scene/backdrop: <environment and subordinate background details>
Subject: <full bride and groom specification; guests or objects if needed>
Style/medium: <shared style bible>
Composition/framing: <aspect ratio, camera distance, safe areas, breathing room>
Lighting/mood: <soft daylight or restrained warm evening light>
Constraints: <one scene; natural hands; no text; no watermark; no hard border>
Avoid: <photorealism; 3D; saturation; harsh contrast; excessive detail>
```

Example for the story scene:

```txt
Use case: illustration-story
Asset type: 3:2 section illustration for a post-wedding memory page
Primary request: bride and groom seated with three close guests around a small wedding restaurant table, smiling and holding champagne glasses
Scene/backdrop: pale flowers, candles and place settings; very light Saint Petersburg river, bridge and dome line work behind the group
Subject: use the locked bride and groom character specification; simple friendly guests in muted pastel clothing
Style/medium: soft pastel minimal hand-drawn flat illustration, thin dark-navy outlines, dusty pink, sage, cream and beige
Composition/framing: horizontal 3:2; show all five people and the complete table grouping; generous soft margins; nothing important near an edge
Constraints: one scene; natural hands and glasses; no text, watermark, border, photorealism or 3D
```

## 6. Review the generation at full resolution

Do not approve from a thumbnail. Inspect the original output and answer all of these:

### Subject and anatomy

- Are the correct number of people present?
- Are eyes and face shapes consistent with the other assets?
- Are hands plausible and attached correctly?
- Are joined hands, glasses, rings, and bouquets readable rather than fused?
- Are there duplicated fingers, flowers, glasses, or architectural elements?

### Composition

- Does the image match its final aspect ratio?
- Is every important subject inside the safe area?
- Would `object-fit: cover` remove a face or hand at desktop or mobile size?
- Is there enough breathing room for rounded corners?
- Does the background support the subject without becoming busy?

### Style

- Is the outline dark navy rather than hard black?
- Are colors muted enough to sit beside the CSS palette?
- Does it look flat and hand-drawn rather than glossy or rendered?
- Are the bride and groom wearing the same clothes as elsewhere?
- Does Saint Petersburg architecture remain subtle and believable?

### Contamination

- No readable text, initials, names, fake signatures, or pseudo-letters.
- No watermark or logo.
- No unintended hard rectangle, white mat, collage boundary, or embedded caption.

If one important item fails, regenerate or perform one targeted edit. Do not hope that a small browser rendering will hide it.

## 7. Transparency and edge quality

Transparent people are harder than opaque gallery scenes because hair, veils, flowers, and antialiased outlines create complex edges.

Preferred order:

1. Generate native transparency when the available image tool supports it reliably.
2. Otherwise generate on a perfectly flat chroma-key background and remove it locally.
3. If clean removal is not possible, generate on the exact section background color and blend intentionally. A clean matching background is better than broken transparency.

Choose a key color that does not appear in the subject. This wedding palette contains pink flowers, sage greenery, beige clothing, white fabric, and dark-navy outlines, so inspect color conflicts before choosing green, magenta, or blue.

For chroma key generation, require:

```txt
Perfectly flat single-color background.
No gradient, texture, floor, shadow, reflection, or lighting variation.
Generous padding and crisp separated edges.
Do not use the key color anywhere in the subject.
```

After removal, inspect the cutout on at least three backgrounds:

- white or warm cream;
- the actual dusty-pink section;
- dark charcoal, which exposes halos and holes.

Reject the result if skin, blush, flowers, veil, or internal white areas become transparent. A large “partially transparent pixel” count is a warning, not proof of quality. Always inspect visually.

Do not commit chroma sources or local processing environments. Keep only the final alpha asset.

## 8. Post-processing and formats

Use the smallest format that preserves the intended look:

- transparent hero: optimized PNG or lossless/lossy WebP with alpha;
- gallery scenes: WebP around quality 85–90;
- simple icons: SVG;
- avoid JPEG for assets with soft flat gradients and line art when it introduces ringing.

Retain enough resolution for high-density displays, but do not commit enormous unused originals. Current targets are approximately:

```txt
hero: 1122 × 1402 or similar portrait resolution
story: 1536 × 1024, 3:2
ceremony: 1672 × 941 or similar wide resolution
supporting gallery: 1448 × 1086, 4:3
```

After conversion, inspect for:

- banding in cream and pink gradients;
- ringing around dark outlines;
- muddy facial features;
- color shifts in sage and skin tones;
- accidental loss of alpha.

## 9. Integrate with deliberate CSS

Use intrinsic dimensions in markup:

```pug
img(
  src="./images/after-wedding/story-wedding-day.png"
  width="1536"
  height="1024"
  alt="Молодожёны и гости за праздничным столом на фоне Петербурга"
)
```

For an illustration that must remain complete:

```css
.after-story__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
```

Do not give a replaced image an aspect ratio and assume the browser will crop correctly. If the complete scene matters, use its natural ratio and `height: auto`.

For gallery cards where cropping is intentional:

```css
.after-gallery-card__image {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 28px;
}

.after-gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Check the actual crop at every breakpoint. `object-fit: cover` is not a substitute for composition review.

## 10. Validate inside the page

The final review must use section-level screenshots, not one giant full-page image. At minimum inspect:

- the changed section at 1440 px desktop width;
- the changed section at 390 px mobile width;
- any neighboring section whose rounded overlap or background transition changed.

For each changed image, verify:

- its subject is large enough to read;
- nothing important is clipped;
- rounded corners do not cut faces or flowers;
- palette and contrast match neighboring sections;
- no hard background rectangle appears;
- captions remain HTML outside the image;
- lazy loading has completed before capture.

Follow [the visual testing guide](visual-testing.md), update only the affected baselines, open them at real resolution, and then run the non-update suite.

## Image completion checklist

- [ ] One asset was generated per prompt.
- [ ] Shared style and character specifications were repeated.
- [ ] The output was reviewed at full resolution.
- [ ] Hands, faces, rings, glasses, bouquet, and guest count are correct.
- [ ] No generated text, watermark, logo, or hard collage border exists.
- [ ] Transparency was checked on light, actual, and dark backgrounds.
- [ ] Final format and dimensions suit the UI slot.
- [ ] Intrinsic dimensions and useful alt text are present in markup.
- [ ] Desktop section screenshot was inspected.
- [ ] Mobile section screenshot was inspected.
- [ ] Final `npm run test:e2e` passes without updating snapshots.
