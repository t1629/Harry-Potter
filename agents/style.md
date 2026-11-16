# 🎨 Estilos de la Aplicación — Harry Potter Page

> Documentación de los estilos utilizados en la aplicación. Los estilos viven en `src/components/layout/` (layout global y estilos por vista) y en `src/components/iu/` (piezas de UI pequeñas), junto a los componentes que los usan.
> Base del sistema: **Bootstrap 5.3 cargado por CDN** en `index.html` (clases como `card`, `container`, `navbar`, `form-control`, `row`/`col-md-*`, `btn btn-outline-*`).
> Última revisión: Noviembre 2026

---

## 1. Organización de los archivos de estilos

```
src/components/
├── layout/                → CSS del layout global y de cada vista
│   ├── App.css            → Hub central: reset global + body oscuro + @imports
│   ├── Header.css         → Cabecera + variables CSS de colores (:root)
│   ├── NavigationBar.css  → Navbar y colores por casa de los links
│   ├── Footer.css         → Pie de página
│   ├── Home.css           → Home + estilos compartidos (cards, formularios, hr)
│   ├── list.css           → Cards del listado
│   ├── Read.css           → Card de detalle
│   ├── remove.css         → Contenedor de la confirmación de borrado
│   ├── notFound.css       → Vista 404 temática
│   └── Loading.css        → Overlay y spinner de carga
└── iu/                    → Piezas de UI pequeñas
    ├── iconMessage.css    → ASCII art del popup de error
    └── buttom.css         → Botón personalizado del detalle
```

**Cómo se cargan los estilos:** cada JSX importa su CSS directamente (no hay un `index.css` único):
- `App.jsx` importa `layout/App.css`, que a su vez actúa como **hub central**: hace `@import` de `Header.css`, `Footer.css`, `NavigationBar.css` y `Home.css` (por eso el Header/Nav/Footer/Home cargan estilos aunque no los importen ellos mismos).
- `list.css`, `Read.css`, `remove.css`, `notFound.css`, `Loading.css`, `iconMessage.css` y `buttom.css` los importa cada vista/componente por su cuenta.
- Los estilos inline (`style={{...}}`) también se usan en algunas vistas (ej. gradientes dorados del formulario en `Create.jsx`/`Edit.jsx`, tamaños de imágenes) — se documentan al final.

---

## 2. Paleta de colores

### 2.1 Variables CSS (`:root` — definidas en `Header.css`)

| Variable | Valor | Uso |
|---|---|---|
| `--gryffindor-red` | `#740001` | Fondo del chip/link de Gryffindor |
| `--gryffindor-gold` | `#d3a625` | Texto y borde de Gryffindor; borde del header |
| `--slytherin-green` | `#1a472a` | Fondo del chip/link de Slytherin |
| `--slytherin-silver` | `#aaaaaa` | Texto y borde de Slytherin |
| `--ravenclaw-blue` | `#0e1a40` | Fondo del chip/link de Ravenclaw; fondo del botón `.btn-listado-read` |
| `--ravenclaw-bronze` | `#946b2d` | Texto y borde de Ravenclaw; texto del botón `.btn-listado-read` |
| `--hufflepuff-yellow` | `#ffdb00` | Fondo del chip de Hufflepuff |
| `--hufflepuff-black` | `#000000` | Texto y borde de Hufflepuff |
| `--magic-purple` | `#8a2be2` | Morado mágico (reservado) |
| `--sparkle-gold` | `#ffd700` | Dorado brillante (reservado) |

### 2.2 Colores base (hardcodeados)

| Color | Dónde se usa |
|---|---|
| `#141310` | Fondo global de la app (`body` en `App.css`, `.hp-container` en `Home.css`, hover del `.btn-nf`) |
| `#f5f5f5` | Color de texto global (`body`, `.card-body-magica`) |
| `#1a1a2e` | Fondo del navbar y del `.navbar-toggler` |
| `#1f2833` | Fondo del footer |
| `goldenrod` | Bordes/glow del navbar, logo, bordes del footer, hr del footer, icono hamburguesa |
| `#d3a625` | "Dorado Hogwarts": borde del header (4px), bordes translúcidos de cards (`rgba(211,166,37,0.2)`), borde inferior `.card-header-magica` |
| `#d4af37` | Dorado del spinner/texto de Loading y del `.nf-text` |
| `#ffd700` | Dorado brillante en `strong` de `.card-body-magica`, glows de `.form-label` |
| `#f5d142` | Dorado de labels de formularios y `.tittle-form` |
| `#ae9206` → `#ffffff` | Pulsos de color en `.tittle-change` / `.text-change` |
| `#ab9706` | Título del 404 (`.nf-title`) |
| `#f5e9d4` / `#e8d9b5` (translúcidos) | Gradiente "pergamino" de las cards mágicas |
| `#2c2c2c` → `#1a1a1a` | Gradiente oscuro de los inputs (`.form-control`) y de `.card-body-magica` |
| `#05187b` / `#0e2bbc` | Azul del botón "Volver a Hogwarts" (`.btn-nf`) |
| `#bdbbbb` | Mitad del anillo del spinner |
| `#946b2d` + `#0e1a40` | Botón "Volver al listado" (`.btn-listado-read`) |

---

## 3. Tipografías

| Fuente | Dónde se usa | Nota |
|---|---|---|
| `"Cinzel", serif` | `h1` del Header, `.card-header-magica`, `h3` de `.card-body-magica` | ⚠️ Referenciada en CSS pero **no se importa** Google Fonts en el proyecto; cae al fallback `serif` si no está instalada en el sistema |
| `"Cinzel Decorative", serif` | `.nf-title`, `.nf-text` (404), `h5` del Loading | Ídem |
| Resto | Fuente por defecto de Bootstrap (font stack del sistema) | |

---

## 4. Animaciones (`@keyframes`)

| Animación | Archivo | Aplicada a | Efecto |
|---|---|---|---|
| `pulse` | `Header.css` | `.logo-icon` y `h1` del header | Opacidad 1 → 0.5 → 1 (2s) |
| `underline-glow` | `Header.css` | `.magic-underline::after` (línea bajo el subtítulo) | Opacidad 0.3 → 1 (2s) |
| `colorPulse` | `Home.css` | `.tittle-change`, `.text-change` | Color dorado `#ae9206` → blanco → dorado (2s) |
| `hrPulse` | `Home.css` | Todos los `<hr>` (selector global) | Color del `<hr>` de 4px cicla entre dorado, verde, azul y rojo (las 4 casas, 4s) |
| `spin` | `Loading.css` | `.loading-spinner` | Rotación 360° (1.2s lineal infinita) |
| `glow` | `Loading.css` | `h5` del Loading | Opacidad y text-shadow dorado pulsante (1.5s alternado) |

---

## 5. Estilos archivo por archivo

### `layout/App.css` — Hub central
- **Qué estiliza:** global (lo importa `App.jsx`).
- **Contenido:**
  - `@import` de `Header.css`, `Footer.css`, `NavigationBar.css` y `Home.css` (los centraliza).
  - Reset universal: `* { margin: 0; padding: 0; box-sizing: border-box; }`.
  - `body`: fondo oscuro `#141310`, texto `#f5f5f5`.

### `layout/Header.css` — Cabecera + paleta
- **Qué estiliza:** `Header.jsx`.
- **Claves:**
  - Define todas las **variables CSS de colores** en `:root` (ver tabla 2.1).
  - `.hp-header`: gradiente diagonal dorado→azul translúcido (`rgba(116,87,0,.9)` → `rgba(2,4,93,.9)`), borde inferior dorado de 4px, `overflow: hidden`.
  - `.title-container`: flex centrado con gap para el logo + título.
  - `h1`: Cinzel 3.5rem, color `#d1cece`, letter-spacing 2px, glow dorado (`text-shadow 0 0 30px rgba(211,166,37,.3)`), animación `pulse`.
  - `.house`: chips con `border-radius: 20px`, hover que levanta 2px con sombra (`translateY(-2px)` + `box-shadow`).
  - Clases por casa: `.gryffindor`, `.slytherin`, `.ravenclaw` (fondo/borde/texto con sus variables). `.hufflepuff` está definida en `NavigationBar.css`.

### `layout/NavigationBar.css` — Navbar
- **Qué estiliza:** `NavigationBar.jsx` (los 3 links reusan las clases de casa).
- **Claves:**
  - `.hp-navbar`: fondo `#1a1a2e` con glow dorado (`box-shadow: 0 0 10px goldenrod`).
  - `.hogwarts-brand`: color goldenrod con doble text-shadow blanco+dorado.
  - `.hogwarts-logo`: logo de 90px de alto.
  - `.nav-link`: píldoras (`border-radius: 20px`) con hover que levanta y sombrea.
  - Clases de casas (incluye `.hufflepuff`, amarillo `#ffdb00` con texto negro).
  - `.navbar-toggler`: borde goldenrod, hover escalado; icono hamburguesa SVG inline con trazos `goldenrod`.
  - **Media query 768px:** links apilados en columna, centrados, de 200px de ancho.

### `layout/Footer.css` — Pie
- **Qué estiliza:** `Footer.jsx`.
- `.hp-footer`: fondo `#1f2833`, texto `#aaa`, centrado, borde superior `goldenrod`, `margin-top: auto` (para pegarlo al fondo del flex container).

### `layout/Home.css` — Home + estilos compartidos
- **Qué estiliza:** `Home.jsx` **y** estilos que reusan otras vistas (cards, formularios, hr).
- **Claves:**
  - `.hp-container`: contenedor raíz de toda la app (flex column, min-height 100vh, fondo `#141310`).
  - `.hp-main`: flex column centrado de la vista Home.
  - `img.varita`: varita de 300px rotada -30°, con márgenes asimétricos; **media queries** a 768px (150px, rotada -15°) y 480px (100px).
  - `.tittle-change` / `.text-change`: animación `colorPulse` (dorado↔blanco).
  - `.card-magica`: gradiente pergamino translúcido + borde dorado translúcido + `border-radius: 15px`; hover que levanta 2px.
  - `.form-label`: labels doradas `#f5d142` con glow (`text-shadow` triple); hover intensifica el glow.
  - `.tittle-form` y `.card-header-magica`: títulos de formulario con glow dorado y Cinzel.
  - `.form-control`: inputs con gradiente oscuro `#2c2c2c → #1a1a1a`, texto blanco `!important`, placeholder `#ccc`.
  - `.card-body-magica`: bloque de datos con gradiente oscuro inverso, glow dorado suave; `strong` en `#ffd700`; `h3` en Cinzel con glow.
  - `hr` (global): 4px, sin borde, animación `hrPulse` con los colores de las 4 casas.
  - `.card-edit .form-label` / `.card-edit .emoji-edit`: variante para el formulario de Editar (glow más suave; los emojis sin text-shadow).

### `layout/list.css` — Listado
- **Qué estiliza:** `List.jsx`.
- `.card` (global Bootstrap sobrescrito): mismo gradiente pergamino + borde dorado translúcido + `border-radius: 15px` (visualmente idéntico a `.card-magica`).
- `.list-container`: contenedor con `min-height: 80vh` y `overflow: hidden` (para que el overlay de Loading cubra la grilla).

### `layout/Read.css` — Detalle
- **Qué estiliza:** `Read.jsx`.
- `.card-detail`: card fija de `22rem` de ancho, mismo gradiente pergamino + borde dorado translúcido + `border-radius: 15px`.

### `layout/remove.css` — Confirmación de borrado
- **Qué estiliza:** `Remove.jsx`.
- `.remove-container`: `min-height: 600px`, `overflow: hidden`, `position: relative` (para el overlay de Loading).

### `layout/notFound.css` — 404
- **Qué estiliza:** `NotFound.jsx`.
- `.nf-container`: flex column centrado, `min-height: 80vh`.
- `.nf-title`: Cinzel Decorative 1.8rem en dorado `#ab9706`.
- `.nf-text`: Cinzel Decorative 1.2rem en `#d4af37` con sombra de texto.
- `.btn-nf`: botón azul `#05187b` con `border-radius: 8px`; hover pasa a fondo `#141310` con texto/glow azul `#0e2bbc`.
- **Media query 768px:** title 1.4rem, texto 1rem, botón más compacto.

### `layout/Loading.css` — Spinner
- **Qué estiliza:** `Loading.jsx`.
- `.loading-overlay`: overlay absoluto (`inset: 0`) con `backdrop-filter: blur(4px)`, `z-index: 50`, `pointer-events: none`.
- `.loading-spinner`: anillo de 220px con bordes alternados dorado `#d4af37` / gris `#bdbbbb`, glow dorado, rotación `spin` 1.2s.
- `.loading-spinner-container h5`: texto "LOADING..." en Cinzel Decorative dorado con animación `glow`.

### `iu/iconMessage.css` — ASCII art
- **Qué estiliza:** el string HTML `iconMessage.jsx` (insertado en el popup de SweetAlert).
- `.ascii-art`: `font-size: 10px`, `line-height: 8px` (comprime el dibujo ASCII), `white-space: pre`, centrado y con `overflow: hidden`.

### `iu/buttom.css` — Botón del detalle
- **Qué estiliza:** el botón "Volver al listado" de `Read.jsx`.
- `.btn-listado-read`: fondo azul Ravenclaw `#0e1a40`, texto/borde bronce `#946b2d`; el hover mantiene los mismos colores (diseño estático intencional).

---

## 6. Estilos inline (hardcodeados en JSX)

Estos estilos NO viven en los CSS: están escritos como props `style={{...}}` en los componentes.

| Componente | Estilos inline |
|---|---|
| `List.jsx` | Imágenes de card: `height: 200px; objectFit: contain` |
| `Read.jsx` | Imagen: `height: 300px; objectFit: contain` |
| `Create.jsx` | Card del formulario: gradiente pergamino + borde `3px solid rgba(211,166,37,0.2)` + `border-radius: 15px` (duplica el look de `.card-magica`); sombrero: `maxWidth: 600px` con `marginLeft: 350px`; botón: `borderRadius: 20px` con márgenes |
| `Edit.jsx` | Card del formulario: mismo gradiente + borde dorado de 3px (duplicado de Create); `hr` con `marginBottom: 50px`; título con `fontFamily: "serif"` |
| `Remove.jsx` | Imagen del mago: `maxWidth: 500px`; contenedor con `position: relative` |
| `Loading` (uso) | Ninguno (todo en su CSS) |

> 📝 Nota: los gradientes dorados de Create/Edit duplican el estilo de `.card-magica`. Centralizarlos en CSS propios está sugerido en el roadmap de `ARQUITECTURA.md`/`ARCHITECTURE.md` (no se hizo para no tocar estilos).

---

## 7. Convenciones y detalles a saber

1. **Mixto de nombres:** `list.css`, `remove.css`, `notFound.css` en minúscula vs `Header.css`, `Home.css`, `Read.css`, `Loading.css` en PascalCase. La carpeta `iu/` sería convencionalmente `ui/`. (Documentado; sin cambio para no tocar estilos.)
2. **`!important`:** usado en `.form-control` (color blanco) y en `.emoji-edit` (quitar text-shadow) para vencer reglas de Bootstrap.
3. **Selectores globales con cuidado:** `hr` (todos los separadores animados) y `h1` (solo existe uno, en el Header) están estilizados de forma global en sus archivos.
4. **Fuentes Cinzel no importadas:** las tipografías `Cinzel` / `Cinzel Decorative` se declaran pero nadie carga Google Fonts; si el SO no las tiene, cae a `serif`.
5. **Duplicación visual deliberada:** `.card-magica` (Home.css), `.card` (list.css) y `.card-detail` (Read.css) comparten el mismo gradiente pergamino + borde dorado.
6. **Herramienta de sombras recurrente:** el "glow mágico" se logra con `text-shadow` / `box-shadow` en tonos dorado (`#f5d142`, `#ffd700`, `#d4af37`, `goldenrod`).
7. **Responsive:** breakpoints en 768px (navbar links, varita, 404) y 480px (varita).
8. **Bootstrap por CDN:** las utilidades (`shadow`, `fw-bold`, `d-flex`, `gap-*`, `text-center`, etc.) vienen del CDN de `index.html`; si un día se desea Bootstrap como dependencia npm, habría que reemplazar ese CDN.
