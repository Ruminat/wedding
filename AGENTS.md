# Agent guide

This file applies to the entire repository. Read the linked project documents before changing the post-wedding experience:

- [Post-wedding context and quality bar](docs/after-wedding-context.md)
- [Image quality guide](docs/image-quality-guide.md)
- [Visual testing guide](docs/visual-testing.md)

## Product invariants

- The original invitation is still the default experience.
- The post-wedding page is enabled by the presence of `afterWedding`, including `?afterWedding`, `?afterWedding=true`, and `?afterWedding=1`.
- Do not remove, restyle, or change the behavior of the invitation branch unless the task explicitly asks for it.
- The wedding timestamp is `2026-08-25T12:20:00+03:00`.
- Post-wedding copy is real HTML text. Never bake headings, captions, dates, or labels into images.

## Implementation conventions

- Reuse the existing Vite, Pug, TypeScript, and SCSS setup.
- Keep post-wedding code inside `src/components/after-wedding/` where practical.
- Prefix post-wedding selectors with `after-` to avoid leaking styles into the invitation.
- Preserve the synchronous mode class in `index.html`; it prevents the wrong branch flashing before JavaScript loads.
- Load branch-specific behavior from `src/index.ts`. Do not initialize invitation form logic on the post-wedding page.
- Use the existing palette from `src/styles/var.scss` where it is close enough, with the normalized post-wedding tokens in `src/components/after-wedding/style.scss`.
- Keep images responsive and declare intrinsic `width` and `height` in Pug.
- Use `object-fit: cover` only when intentional cropping is part of a gallery card. Editorial illustrations that must show the complete scene use natural dimensions or `object-fit: contain`.
- Keep decorative icons as SVG when they are simple enough to draw deterministically.

## Visual quality bar

The page should feel minimal, cute, soft, pastel, airy, romantic, and clean. It should not feel like a collection of unrelated generated images.

Preserve these traits:

- dusty pink, pale sage, warm cream, beige, and dark navy;
- generous spacing and large rounded sections;
- restrained shadows and contrast;
- consistent couple appearance across every scene;
- soft hand-drawn outlines and simple shapes;
- legible Cyrillic typography;
- coherent desktop and mobile compositions.

Avoid saturated colors, heavy black outlines, glossy rendering, photorealism, 3D, dense decoration, hard white image rectangles, generated text, and style drift between assets.

## Required verification

Run the checks relevant to the change:

```sh
npm run typecheck
npm run build
npm run test:e2e
```

For intentional visual changes, regenerate baselines with:

```sh
npm run test:e2e:update
```

Never accept new baselines blindly. Open and inspect every affected section screenshot at its real resolution first.

The visual tests deliberately capture each page section separately at desktop and mobile widths. Do not replace them with a single full-page screenshot; oversized screenshots hide cropping, spacing, and image-integration defects.

## Working-tree discipline

- Preserve unrelated user changes.
- Do not replace useful existing abstractions without a concrete reason.
- Keep generated source/intermediate files out of the repository. Commit only final optimized assets and the visual baselines that verify them.
- Do not run broad dependency upgrades or automatic audit fixes as part of an unrelated visual task.
