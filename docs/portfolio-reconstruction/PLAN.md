# Portfolio Reconstruction Plan

## Overview
Rebuild Mithlesh Kumar Das's portfolio in the existing **mithi** Next.js 15 project, inspired by the reference portfolio at [mdamiruddin-3dportfolio.vercel.app](https://mdamiruddin-3dportfolio.vercel.app/) while personalising it fully for Mithlesh's verified identity and work.

---

## Phase 1 — Inspection Findings

### Current Project Status
| Item | Status |
|------|--------|
| Framework | Next.js 15.5.24 + React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| 3D engine | THREE.js v0.186 (procedural room, no GLB) |
| Animation | GSAP 3.15 + ScrollTrigger + Lenis |
| Content | `src/lib/site.ts` — fully personalised |
| Build | ✅ Passes `next build` cleanly |
| Sections | Hero, About, Skills, Projects, Experience, Contact |

### Risks
- THREE.js procedural room requires `document` calls — must stay "use client" and SSR-safe.
- Large initial JS bundle (~354 kB) due to Three.js; acceptable for a portfolio.
- `framer-motion` and `motion` both listed in deps (redundant); prefer `motion/react`.

---

## Phase 2 — Reference Analysis (MdAmiruddin Portfolio)

### Key Features in Reference
1. **3D Room** — Blender GLB model loaded via Three.js + DRACOLoader (compressed mesh).
2. **Camera choreography** — GSAP ScrollTrigger drives orthographic camera and room-rotation per section.
3. **Preloader** — Progress bar blocking render until WebGL frame is ready.
4. **Smooth scroll** — Lenis lerp scroll with ScrollTrigger integration.
5. **Theme toggle** — Dark / light with material colour transitions.
6. **Section layout** — Full-viewport rows, content card alternating left/right, large outlined section number.
7. **Reveal animation** — IntersectionObserver fade+slide-in per card.
8. **Monitor screen** — Canvas texture animation (code editor) on the desk model.
9. **Navbar** — Fixed glassmorphism bar with active-section highlight.
10. **Preloader** — Counts to 100%, then fades out and fires intro animation.

### Design Decisions
- Retain procedural THREE.js room (no GLB dependency/asset management needed).
- Use the reference's orthographic camera + scroll-scrub approach (already implemented).
- Adopt reference color palette philosophy: deep navy dark mode, warm cream light mode.
- Keep section layout matching reference: full-viewport rows, content card alternating sides.

---

## Phase 3 — Implementation Steps

### Completed
- Next.js + TypeScript project structure
- Tailwind CSS v4 design system (globals.css)
- THREE.js procedural room with desk, monitor, fish tank, plants, lights
- Animated canvas screen texture (code editor animation)
- GSAP ScrollTrigger camera choreography (6 keyframes — 6 sections)
- Lenis smooth scroll
- Preloader component with progress bar
- Navbar with glassmorphism + active section tracking
- Hero section with motion.js reveal
- About section with stats and focus areas
- Skills section with categorised tech badges
- Projects section with cards, repo/demo links
- Experience section with education, traits, engineering logs
- Contact section with social links and CV download
- Footer with social icons and back-to-top
- Theme toggle (dark/light)
- RevealComponent (IntersectionObserver, 6 directions)
- SectionShell layout (card alternating left/right)
- SEO metadata in layout.tsx
- All personal content verified (GitHub, LinkedIn, X)
- CV PDF in public/
- Profile photo in public/images/
- Project images in public/images/

### Remaining / Polish
- Verify the dev server loads without 500 errors
- Visual smoke-test in browser
- Run type-check and lint
- Confirm all nav links scroll to correct sections
- Confirm CV download works
- Confirm dark/light theme toggle animates scene

---

## Testing Strategy
1. `npm run typecheck` — zero TS errors
2. `npm run lint` — zero ESLint warnings
3. `npm run build` — clean production build
4. Browser visual check: preloader — hero — scroll through all sections — theme toggle
5. Mobile responsive check at 390px, 768px breakpoints
6. Compare screenshots against reference screenshots
