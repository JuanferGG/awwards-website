# Clone — Awwwards Winning Website 2024

Proyecto: clon del sitio "Awwwards Winning Website 2024".  

Descripción
- Sitio construido con React + Vite y estilos con Tailwind CSS.
- Animaciones con GSAP; videos e imágenes en la carpeta `public`.

Archivos y componentes clave
- [`App`](src/App.jsx) — Punto de entrada de la aplicación.  
- Componentes principales:
  - [`Hero`](src/components/Hero.jsx) — Sección principal con videos y loader.
  - [`NavBar`](src/components/NavBar.jsx) — Barra de navegación y control de audio.
  - [`AnimatedTitle`](src/components/AnimatedTitle.jsx) — Títulos animados por scroll.
  - [`Story`](src/components/Story.jsx) — Sección interactiva con efecto 3D.
  - [`Features`](src/components/Features.jsx) — Grid de características y tarjetas.
  - [`Contact`](src/components/Contact.jsx) — Sección de contacto.
- Estilos globales: [`src/index.css`](src/index.css).  
- Assets públicos: [`public/screen-full-page.png`](public/screen-full-page.png), carpeta [`public`](public).

Requisitos
- Node.js (v16+) recomendado
- pnpm (recomendado) o npm

Instalación y ejecución
```sh
pnpm install
pnpm dev
# o con npm
npm install
npm run dev

```

## Captura del proyecto terminado:  
![Full page screenshot](public/screen-full-page.png)