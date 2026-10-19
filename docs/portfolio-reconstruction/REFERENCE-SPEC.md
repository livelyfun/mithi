# Reference Specification — MdAmiruddin 3D Portfolio

Source: https://github.com/MdAmiruddin/mdamiruddin-3dportfolio
Live:   https://mdamiruddin-3dportfolio.vercel.app/

---

## Technology Stack (Reference)
- **Bundler**: Vite (vanilla JS, no framework)
- **3D**: Three.js with DRACOLoader + GLTF loader for compressed .glb models
- **Animation**: GSAP + ScrollTrigger
- **Scroll**: Lenis smooth scroll
- **Models**: Two .glb files — "Finale Version 16.glb" (room) and "New Boko.glb" (secondary)
- **Video Texture**: kda.mp4 on the monitor screen
- **CSS**: Single style.css with CSS custom properties

## Reference Colour Palette
```
Dark:  background #0c1220, accent pinks/purples
Light: background warm cream, warm wood tones
```

## Reference Sections & Layout
| # | Section   | Side   | Notes                          |
|---|-----------|--------|-------------------------------|
| 1 | Hero      | Left   | Name, tagline, CTA buttons    |
| 2 | About     | Left   | Paragraphs + stat counters    |
| 3 | Skills    | Right  | Categorised badge lists        |
| 4 | Projects  | Left   | Cards with links              |
| 5 | Experience| Right  | Timeline of roles             |
| 6 | Contact   | Left   | Email CTA + socials           |

## Camera Choreography (Reference)
The reference uses an **orthographic camera** at ~45° isometric angle.
Each scroll section triggers a GSAP to() on camera position + room rotation:
- Hero:      cam far, room centered
- About:     cam slightly closer, room pans right
- Skills:    room pans left
- Projects:  cam zooms in
- Experience: room tilts
- Contact:   cam pulls wide

## Reference Scroll Mechanism
```js
// Lenis → gsap.ticker → ScrollTrigger.update()
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

## CSS Utilities Used in Reference
- Glassmorphism: `backdrop-filter: blur()`, semi-transparent backgrounds
- Section number: `-webkit-text-stroke` for outlined large numbers
- Card: `border-radius: 42px`, `background: rgba(white, 0.08)`
- Smooth reveal: CSS transition on `opacity` + `transform: translateY`

## What We Adopted vs Adapted
| Reference Feature         | Our Implementation           |
|---------------------------|------------------------------|
| GLB room model            | Procedural THREE.js geometry |
| Video screen texture      | Animated canvas code editor  |
| Vanilla JS sections       | React components (Next.js)   |
| GSAP ScrollTrigger camera | Same, ported to TypeScript   |
| Lenis smooth scroll       | Same package                 |
| Outlined section numbers  | Same technique (WebkitStroke)|
| Section card layout       | SectionShell component       |
| Glassmorphism navbar      | Reproduced in Tailwind CSS   |
| Theme toggle              | ThemeContext + GSAP color tween |
