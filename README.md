# OneMusic 🎵

## Technical Executive Overview
OneMusic is a lightweight, client‑side web application that delivers free, ad‑free music streaming through a static HTML/CSS/JS stack. The site is hosted on Vercel and can be run locally with any static‑file server.

## System Architecture
```mermaid
flowchart TD
    subgraph Browser
        UI[UI (index.html + style.css)]
        JS[Interaction Logic (script.js)]
        Media[HTML5 Audio Element]
    end

    subgraph Assets
        Img[Images & Screenshots]
        Vid[Promotional Videos]
        APK[Android APK]
    end

    UI -->|loads| JS
    UI -->|references| Media
    JS -->|controls| Media
    Media -->|plays| Stream[Remote Audio Stream (CDN / public URLs)]
    UI -->|displays| Img
    UI -->|plays| Vid
    UI -->|offers download| APK

    classDef static fill:#f9f,stroke:#333,stroke-width:1px;
    class UI,JS,Media,Img,Vid,APK static;
```

## Key Modules & Directory Layout
```
/
├─ .gitignore
├─ LICENSE
├─ README.md
├─ index.html          # Main entry point, UI markup
├─ style.css           # Global styling, responsive layout
├─ script.js           # UI interactions, audio control, playlist handling
├─ googlea64aa9b5a3075103.html   # Google site‑verification
├─ assets/             # Media assets
│   ├─ OneMusic.apk
│   ├─ logo.png
│   ├─ promo-photo-1.jpg
│   ├─ promo-photo-2.jpg
│   ├─ promo-video-1.mp4
│   ├─ promo.mp4
│   ├─ screenshot-1.png
│   ├─ screenshot-2.png
│   ├─ screenshot-3.png
│   └─ screenshot-4.png
└─ docs/
    └─ ARCHITECTURE.md # Detailed design notes (optional)
```

## Prerequisites & Environment Configuration
| Requirement | Details |
|-------------|---------|
| **Node.js (optional)** | Only needed for local development tooling (e.g., `serve`, `http-server`). |
| **Static web server** | Any HTTP server that can serve static files (Vercel, Netlify, `python -m http.server`, `npx serve`). |
| **Browser** | Modern browsers with HTML5 Audio support (Chrome, Firefox, Edge, Safari). |

No enviro