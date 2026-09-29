# Sahil — Gameplay Programmer | Unreal Engine Portfolio

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Unreal Engine 5](https://img.shields.io/badge/Unreal_Engine_5-313131?style=for-the-badge&logo=unrealengine&logoColor=white)
![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)

<p align="center">
  <strong>Interactive portfolio showcasing Unreal Engine 5 gameplay programming projects, photography, and game development work.</strong>
</p>

</div>

---

## 🌟 Features

- **🎮 Interactive 3D Stage** - Real-time 3D camera model powered by `@google/model-viewer` with cursor-tracking orbit physics and dynamic SVG facial expressions.
- **📸 2D Voxel Camera Companion "Pixel"** - Travelling companion with retro teleport mechanics, animated face states, and contextual speech bubbles.
- **🎯 Sniper & Particle Click Effects** - GPU-accelerated click bursts with vector crosshairs and radial micro-particles.
- **🌓 Dual-Theme System** - Instant switching between **Porcelain Light** and **Onyx Dark** themes with zero flicker, persisted via `localStorage`.
- **📜 2-Step Scroll Boundary Navigation** - Single-page router with intelligent scroll boundary detection; users can scroll through project grids without triggering page jumps.
- **📱 Fully Responsive** - Optimised layouts for desktop, tablet, and mobile.

---

## 📂 Project Structure

```text
portfolio/
├── index.html                    # Main SPA — all six pages (Home, About, Education, Projects, Gallery, Connect)
├── project-cpp.html              # UE5 Action RPG (C++) deep-dive page
├── project-blueprints.html       # UE5 Coin Collector (Blueprints) deep-dive page
├── photography.html              # Photography full-album standalone page
├── README.md                     # This file
├── .gitignore                    # Git ignore rules
└── assets/
    ├── css/
    │   ├── style.css             # Global variables, typography, dark theme, page layouts
    │   └── components.css        # Gallery, lightbox, project page, card components
    ├── js/
    │   ├── script.js             # Navigation router, companion engine, copy buttons, cursor FX
    │   ├── gallery.js            # Gallery rendering, masonry grid, lightbox, filtering
    │   ├── gallery-data.js       # All gallery image/video data arrays
    │   ├── companion-standalone.js # 2D companion for standalone project pages
    │   └── image-scroller.js     # Horizontal image scroll utility
    ├── games/
    │   ├── cpp/                  # C++ Action RPG screenshots, videos, and blueprint screenshots
    │   └── blueprints/           # Coin Collector screenshots, videos, and gameplay footage
    ├── images/
    │   └── blueprints-project-thumb.jpg
    ├── models/
    │   └── character3.glb        # Active 3D camera character (used on Home page)
    ├── photography/              # 13 web-optimised photos (WebP + JPG + thumbnails)
    └── videos/                   # (Empty — placeholder for future video reels)
```

---

## 🚀 Local Development

```bash
# Python (no install required)
python -m http.server 8000
# Then open http://localhost:8000

# Node.js
npx serve .
```

Or install the **Live Server** extension in VS Code and right-click `index.html`.

---

## 🌐 Deployment

Deployed via **Vercel** — push to `main` and Vercel auto-deploys.

To deploy manually:
1. Push to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. No build step needed — this is a static site.

---

## 🛠️ Built With

- **HTML5** — Semantic markup, `<picture>` elements for responsive images
- **CSS3** — Custom Properties, Flexbox, CSS Grid, Keyframe Animations, CSS Columns (masonry)
- **Vanilla JavaScript** — ES6+, Web Animations API, delegated event listeners
- **Google Model Viewer** — Real-time 3D glTF/GLB rendering
- **Google Fonts** — `Press Start 2P`, `Space Grotesk`, `Plus Jakarta Sans`, `Space Mono`

---

## 📬 Contact

- **Email**: [sahil41657@gmail.com](mailto:sahil41657@gmail.com)
- **GitHub**: [@Sahild48](https://github.com/Sahild48)
- **LinkedIn**: [linkedin.com/in/sahild48](https://www.linkedin.com/in/sahild48)

---

<div align="center">
  <sub>Designed & Crafted by Sahil · 2026</sub>
</div>
