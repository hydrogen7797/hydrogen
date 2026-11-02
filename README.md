# Goodpatch home page — Next.js recreation

A portfolio study rebuilding the [goodpatch.com/ja](https://goodpatch.com/ja) home page in Next.js 16 (App Router), Tailwind CSS v4, GSAP ScrollTrigger, Lenis and three.js.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of "/"
```

## Structure

```
src/
  app/            layout (fonts, metadata), page (section order), globals.css (design tokens)
  data/home.ts    all copy, links and image paths
  components/
    providers/    Lenis smooth scroll + GSAP ticker, "モーション" pause context
    layout/       Header, Footer, PatchyLauncher (chat widget)
    home/         one file per section
    ui/           ArrowPill / TextLink / OutlineButton, Reveal helpers, MotionToggle
    icons/        logo + social icons generated from the original SVGs
public/images/    assets from the saved page, renamed by section
```

## Section notes

| Section | Implementation |
| --- | --- |
| Hero → Intro → Business | `HeroStage.tsx`: one sticky 380svh stage. The three.js scene (`HeroScene.tsx`, procedural puffy blobs + glowing heart) is seen through a `clip-path` circle that shrinks into a glass "lens". On hover the lens follows the cursor and swaps to the business imagery. |
| Featured Work | Filterable grid. On hover a circle that follows the cursor reveals the back image of each card. Patchy floats down the section on his balloon. |
| Client Interview | Sticky giant heading that fades as the staggered cards scroll over it. |
| Design Platforms | Sliding row highlight and a soft-edged media circle that follows the cursor. |
| Latest Activities | The blue from Platforms closes into a circle that ends up as the full stop of the scrolling headline. |
| Company / Careers / Get In Touch | Parallax heading, beating heart contour rings, floating member cards, and the arm-and-hand "handoff" illustration. |

## Differences from the original

- **Japanese font**: the original uses Adobe Fonts' *ryo-gothic-plusn*. This build substitutes **Noto Sans JP**.
- **Hero 3D**: the original scene uses custom models. This one is a procedural approximation.
- **Careers**: the original plays short looping videos of team members. These are stills taken from a screen recording, in `public/images/careers/`.
- **Chat**: the Patchy chat answers with canned replies. It is not connected to an AI backend.
- All text, imagery and branding belong to Goodpatch Inc. Treat this repo as a private study. Don't deploy it publicly as if it were Goodpatch's site.
