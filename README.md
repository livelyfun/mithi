# Mithlesh Kumar Das — 3D Room Portfolio

An interactive 3D room portfolio built with **Three.js**, **Vite**, **GSAP** and **ASScroll**.

Scroll down and the camera moves through a hand-built 3D room while the About, Projects, Skills and Contact sections slide in over it.

- **Live:** https://3d-portfolio-black-seven.vercel.app/
- **GitHub:** https://github.com/livelyfun
- **LinkedIn:** https://www.linkedin.com/in/mithlesh-das-876973343/
- **Email:** mithleshkumardas527@gmail.com

## Stack

- [Three.js](https://threejs.org/) — WebGL scene, GLB room model, video texture
- [Vite](https://vitejs.dev/) — dev server and production build
- [GSAP](https://gsap.com/) + ScrollTrigger — scroll-driven camera and section motion
- [ASScroll](https://github.com/ashthornton/asscroll) — smooth scrolling
- Vanilla HTML/CSS — no UI framework

## Project structure

```text
.
├── Experience/
│   ├── Camera.js          # orthographic camera used for the room
│   ├── Experience.js      # app bootstrap / singleton
│   ├── Preloader.js       # intro animation sequence
│   ├── Renderer.js        # WebGL renderer
│   ├── Theme.js           # light / dark toggle
│   ├── Utils/             # assets, resources, sizes, time
│   └── World/             # room, floor, environment, scroll controls
├── public/
│   ├── draco/             # DRACO decoder for the compressed GLB
│   ├── images/            # profile + project images
│   ├── models/            # 3D room model
│   └── textures/          # monitor video texture
├── index.html             # all page content
├── main.js                # entry point
├── style.css              # layout, theme and section styling
└── vercel.json            # Vercel build + cache headers
```

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Deploy to Vercel

The repository includes `vercel.json`, so importing the repo into Vercel is enough:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Or from the CLI:

```bash
npx vercel --prod
```

## Credits

- Design and code reference: [MdAmiruddin/mdamiruddin-3dportfolio](https://github.com/MdAmiruddin/mdamiruddin-3dportfolio) (MIT)
- Original 3D room concept: [Bokoko33](https://bokoko33.me/)
- 3D room model and scene assets are reused from the MIT-licensed reference project.
- All written content, project descriptions, images and contact details belong to Mithlesh Kumar Das.
