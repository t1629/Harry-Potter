# 🏰 Arquitectura del Proyecto — Harry Potter Page

> Documentación completa de la arquitectura, estructura de archivos y detalles de cada componente de la aplicación.
> Última revisión: Noviembre 2026

---

## 1. Vista general del proyecto

**Hogwarts Mistery** es una SPA (Single Page Application) tipo CRUD para gestionar personajes del universo de Harry Potter: listarlos, ver su detalle, crearlos, editarlos y eliminarlos.

| Aspecto | Detalle |
|---|---|
| **Stack principal** | React 19 + Vite 8 |
| **Enrutado** | React Router DOM v7 |
| **Estilos** | Bootstrap 5.3 (cargado por CDN en `index.html`) + CSS propio por componente |
| **Alertas / popups** | SweetAlert2 |
| **Lenguaje** | JavaScript (JSX), sin TypeScript |
| **Gestor de paquetes** | pnpm (con `pnpm-workspace.yaml`) |
| **Fuente de datos** | `src/data/Characters.json` (copia local del JSON de personajes, importada con alias en `Service.js` — la fake API `hp-api.onrender.com` fue suspendida) |
| **Simulación de red** | CRUD simulado con `setTimeout` (500ms en `GetAll`, 300ms en el resto) |
| **Estado global** | `useState` en `App.jsx` (sin Redux ni Context) |
| **Despliegue** | GitHub Pages → `https://t1629.github.io/Harry-Potter/` |
| **Base path** | `/Harry-Potter/` (definido en `vite.config.js` y `main.jsx`) |

### Arquitectura conceptual (por capas)

```
┌─────────────────────────────────────────────────────────┐
│  CAPA ENTRY:    index.html  →  main.jsx                 │
├─────────────────────────────────────────────────────────┤
│  CAPA RUTAS / ESTADO GLOBAL:  App.jsx                   │
│  (declara las rutas y posee el estado "personajes")     │
├─────────────────────────────────────────────────────────┤
│  CAPA VISTAS:   src/page/*  (Home, List, Read, ...)     │
│  reciben "personajes" y "setPersonajes" por PROPS       │
├─────────────────────────────────────────────────────────┤
│  CAPA SERVICIOS:  src/service/Service.js                │
│  (CRUD simulado + datos de src/data/Characters.json)    │
│  └─ utilidad de red (obsoleta) → src/service/Api.js     │
├─────────────────────────────────────────────────────────┤
│  CAPA COMPONENTES SHARED:  src/components/*             │
│  (Header, NavigationBar, Footer, Loading, iu/iconMessage)│
├─────────────────────────────────────────────────────────┤
│  CAPA ESTILOS:  src/components/layout/*.css + iu/*.css  │
├─────────────────────────────────────────────────────────┤
│  CAPA ESTÁTICOS:  src/assets/*   y   public/*           │
└─────────────────────────────────────────────────────────┘
```

Regla de la arquitectura actual: **`App.jsx` es la única fuente de verdad**. El estado `personajes` se crea ahí y baja por props a las vistas; las vistas lo modifican a través de `setPersonajes` (función que "sube" el cambio). Los archivos de `service/` son la única puerta entre las vistas y los datos (hoy desde `src/data/Characters.json` con latencia simulada).

---

## 2. Estructura de carpetas

```
Harry_Potter_Page/
│
├── index.html                        → Punto de entrada del navegador (HTML raíz)
├── package.json                      → Dependencias, scripts y homepage
├── vite.config.js                    → Configuración de Vite (build/dev + base path)
├── eslint.config.js                  → Reglas de linting (flat config de ESLint 10)
├── .gitignore                        → Exclusiones de git (node_modules, dist, logs)
├── pnpm-workspace.yaml               → Workspace de pnpm
├── pnpm-lock.yaml                    → Lockfile de dependencias (pnpm)
├── Documentation.txt                 → Notas pendientes del proyecto (mejoras futuras)
├── README.md                         → README de la plantilla React+Vite
│
├── .github/
│   └── workflows/
│       └── deploy.yml                → CI/CD: build y deploy automático a GitHub Pages
│
├── public/                           → Estáticos servidos tal cual en la raíz del deploy
│   └── harry-potter-icon.webp        → Favicon de la app
│
├── dist/                             → Build de producción generado por `vite build`
│                                       (no editar manualmente; se regenera)
│
├── agents/                          → Documentación de arquitectura y estilos
│   ├── ARQUITECTURA.md              → Este documento (español)
│   ├── ARCHITECTURE.md              → Versión en inglés de este documento
│   └── style.md                     → Documentación de los estilos de la app
│
└── src/                              → TODO el código fuente de la app
    ├── main.jsx                      → Montaje de React en el DOM + BrowserRouter
    ├── App.jsx                       → Rutas + estado global "personajes" + layout
    │
    ├── data/                        → DATOS LOCALES: JSON de personajes (ex API externa)
    │   └── Characters.json          → Copia de los datos de personajes (de un repo de GitHub)
    │
    ├── data/                        → DATOS LOCALES: JSON de personajes (ex API externa)
    │   └── Characters.json          → Copia de los datos de personajes (de un repo de GitHub)
    │
    ├── service/                      → CAPA DE DATOS: CRUD simulado
    │   ├── Api.js                    → Wrapper de `fetch` (OBSOLETO: ya no se usa, se conserva)
    │   └── Service.js                → CRUD simulado con setTimeout (GetAll, Get, Create, Edit, Remove)
    │
    ├── page/                         → CAPA DE VISTAS: una por cada ruta
    │   ├── Home.jsx                  → Vista "/" (bienvenida)
    │   ├── List.jsx                  → Vista "/Listado" (cards de personajes)
    │   ├── Read.jsx                  → Vista "/Detalle/:id" (detalle de personaje)
    │   ├── Create.jsx                → Vista "/CrearPersonaje" (formulario crear)
    │   ├── Edit.jsx                  → Vista "/EditarPersonaje/:id" (formulario editar)
    │   ├── Remove.jsx                → Vista "/Eliminar/:id" (confirmación de borrado)
    │   ├── NotFound.jsx              → Vista "*" (404 temático)
    │   └── ErrorMessage.jsx          → Popup "Personaje no encontrado" (SweetAlert2)
    │
    ├── components/                   → Componentes reutilizados en todas las vistas
    │   ├── Header.jsx                → Cabecera con título y casas de Hogwarts
    │   ├── NavigationBar.jsx         → Barra de navegación con los links
    │   ├── Footer.jsx                → Pie de página
    │   ├── Loading.jsx               → Spinner de carga (overlay)
    │   ├── layout/                   → CSS del layout global y de cada vista
    │   │   ├── App.css               → Contenedor global de la app
    │   │   ├── Header.css            → Estilos del Header
    │   │   ├── NavigationBar.css     → Estilos del navbar
    │   │   ├── Footer.css            → Estilos del Footer
    │   │   ├── Home.css              → Estilos de la vista Home
    │   │   ├── list.css              → Estilos de las cards del listado
    │   │   ├── Read.css              → Estilos del detalle
    │   │   ├── remove.css            → Estilos de la confirmación de borrado
    │   │   ├── notFound.css          → Estilos del 404
    │   │   └── Loading.css           → Estilos del spinner
    │   └── iu/                       → Piezas de UI pequeñas
    │       ├── iconMessage.jsx       → ASCII art de Harry Potter (string HTML)
    │       ├── iconMessage.css       → Estilos del ASCII art
    │       └── buttom.css            → Estilos de botones reutilizables
    │
    └── assets/                       → Imágenes importadas por el código (las procesa Vite)
        ├── pngwing.com.png           → Logo usado en NavigationBar
        ├── pngwing.com4.png          → Varita usada en Home
        ├── pngwing.comS.png          → Sombrero seleccionador usado en Create
        ├── pngwing.com3.png          → Imagen sin uso activo (backup)
        ├── pngwing.comS-DFepRM93...  → Variantes de build (hashes, ver dist/)
        ├── pngegg.png                → Mago usado en Remove
        ├── 6127d693aa481f0004...png  → Imagen sin uso activo (backup)
        ├── notFoundImage.png         → Imagen del Ministerio de Magia (404)
        └── harry-potter-page.html    → Copia local de una página web de referencia
            (junto a harry-potter-page_files/) — material de diseño, NO es parte de la app
```

> ⚠️ Nota: `src/assets/harry-potter-page.html` y su carpeta `_files` son un archivo guardado "Guardar como..." de una web de referencia. **No son parte del build de React**, solo material de diseño guardado ahí.

---

## 3. Descripción detallada archivo por archivo

### 3.1 Raíz del proyecto

#### 📄 `index.html`
- **Capa:** Entry (punto de entrada del navegador).
- **Ubicación en la arquitectura:** Es lo primero que carga el navegador. Vite lo usa como plantilla para el build.
- **Qué hace:**
  - Define el `<div id="root">`, el contenedor donde React monta toda la app.
  - Carga **Bootstrap 5.3 por CDN** (CSS en `<head>`, JS bundle antes de cerrar `<body>`) — por eso todas las vistas usan clases como `card`, `container`, `navbar`, etc. sin tener Bootstrap instalado como dependencia npm.
  - Referencia el favicon `public/harry-potter-icon.webp`.
  - Carga el código de React con `<script type="module" src="/src/main.jsx">`.
- **Conexiones:** `main.jsx` (el script que monta la app).

#### 📄 `package.json`
- **Capa:** Configuración.
- **Qué hace:**
  - Define el nombre `harry-potter-page` y el tipo de módulo (`"type": "module"`).
  - **Scripts:**
    | Script | Comando | Utilidad |
    |---|---|---|
    | `dev` | `vite` | Servidor de desarrollo con HMR |
    | `build` | `vite build` | Genera `dist/` para producción |
    | `preview` | `vite preview` | Previsualiza el build localmente |
    | `lint` | `eslint .` | Analiza el código con ESLint |
  - **Dependencias clave:** `react`, `react-dom`, `react-router-dom` (rutas), `sweetalert2` (popups). *(Nota: `opencode-ai` aparece como dependencia pero no se usa en el código.)*
  - `"homepage": "https://t1629.github.io/Harry-Potter/"` — refleja el destino de GitHub Pages.

#### 📄 `vite.config.js`
- **Capa:** Configuración de build.
- **Qué hace:**
  - Activa el plugin oficial de React (`@vitejs/plugin-react`, basado en Oxc) para transpilar JSX y activar HMR.
  - **`base: "/Harry-Potter/"`**: CRÍTICO para GitHub Pages. Hace que todos los assets, rutas y builds usen ese prefijo. Si se cambia, el deploy en GitHub Pages rompería.
- **Conexiones:** Debe coincidir con el `basename="/Harry-Potter"` de `main.jsx`.

#### 📄 `eslint.config.js`
- **Capa:** Calidad de código.
- **Qué hace:** Usa flat config de ESLint con:
  - `@eslint/js` recommended (reglas base de JS).
  - `eslint-plugin-react-hooks` recommended (valida el uso correcto de `useState`, `useEffect`, etc.).
  - `eslint-plugin-react-refresh` (vite) (reglas de export de componentes para HMR).
  - Ignora `dist/`.
  - Globals de navegador (por eso `window`, `document`, etc. no dan error).

#### 📄 `.gitignore`
- Excluye `node_modules/`, `dist/`, logs y archivos de editores. Evita subir builds ni dependencias al repo.

#### 📄 `.github/workflows/deploy.yml`
- **Capa:** CI/CD.
- **Qué hace (paso a paso) al hacer `push` a la rama `main`:**
  1. `actions/checkout@v4` — descarga el código.
  2. `pnpm/action-setup@v3` con versión 9 — instala pnpm.
  3. `actions/setup-node@v4` con Node 20 y caché de pnpm.
  4. `pnpm install` — instala dependencias.
  5. `pnpm run build` — genera `dist/`.
  6. `actions/upload-pages-artifact@v3` — sube `dist/` como artefacto.
  7. `actions/deploy-pages@v4` — publica el artefacto en GitHub Pages.
- **Permisos:** `contents: read`, `pages: write`, `id-token: write` (necesarios para Pages).

---

### 3.2 `src/` — Entrada y rutas

#### 📄 `src/main.jsx`
- **Capa:** Entry de React.
- **Qué hace:**
  - `createRoot(document.getElementById("root")).render(...)` — monta React en el `#root` de `index.html`.
  - Envuelve la app en **`BrowserRouter` con `basename="/Harry-Potter"`**:
    - Es la razón por la que se puede usar `/Listado` en los `<Link>` sin escribir el prefijo en cada lugar.
    - Debe coincidir SIEMPRE con `base` de `vite.config.js`.
  - Activa `StrictMode` (detecta side effects dobles en desarrollo).
- **Conexiones:** `App.jsx`, y angular con `index.html`.

#### 📄 `src/App.jsx`
- **Capa:** Rutas + Estado global + Layout global. **Es el corazón de la aplicación.**
- **Estado global:** `const [personajes, setPersonajes] = useState([])`.
  - Es la **única fuente de verdad** del proyecto: toda la lista de personajes vive aquí.
  - Baja a las vistas por props (`personajes`) y se modifica solo por la función `setPersonajes` que se baja por props (`lifting state up`).
- **Layout global:** Renderiza `<Header />`, `<NavigationBar />`, el `<Routes>` y `<Footer />` en un contenedor `hp-container`.
- **Tabla de rutas declaradas:**

  | Ruta | Vista | Props que recibe |
  |---|---|---|
  | `/` | `Home` | (ninguna) |
  | `/Listado` | `List` | `personajes`, `setPersonajes` |
  | `/Detalle/:id` | `Read` | `personajes` |
  | `/EditarPersonaje/:id` | `Edit` | `personajes`, `setPersonajes` |
  | `/CrearPersonaje` | `Create` | `personajes`, `setPersonajes` |
  | `/Eliminar/:id` | `Remove` | `personajes`, `setPersonajes` |
  | `*` (cualquier otra) | `NotFound` | (ninguna) |

- **Importa** `./components/layout/App.css` para el estilo del contenedor global.
- **Conexiones:** apunta a las 7 vistas + los 3 componentes de layout.

---

### 3.3 `src/data/` y `src/service/` — Capa de datos

#### 📄 `src/data/Characters.json`
- **Capa:** Datos locales (la fuente de verdad de los personajes base).
- **Origen:** copia de la carpeta `data` de un repositorio de GitHub con los datos JSON de los personajes. Se creó porque la fake API `https://hp-api.onrender.com` fue **suspendida por sus creadores**.
- **Contenido:** un array de ~400 objetos con los personajes del universo Harry Potter: `id` (UUID original), `name`, `species`, `gender`, `house`, `wand`, `patronus`, `actor`, `image`, etc.
- **Nota:** los personajes creados por el usuario NO viven aquí; solo en el estado de `App.jsx` (ver flujo de datos).

#### 📄 `src/service/Api.js`
- **Capa:** Utilidad de red (⚠️ **OBSOLETA**).
- **Qué hace:**
  - Exporta por defecto la función asíncrona `fetchHp(url, options)` que hacía `fetch` a una URL y parseaba el JSON con manejo de errores.
  - Era la utilidad que `Service.js` usaba cuando la fuente era la API externa.
- **Estado actual:** `Service.js` aún la importa (`import fetchHp`) pero **ya no la invoca** (los datos ahora vienen del JSON local). Se conserva intacta por decisión del proyecto; podría servir si en el futuro se vuelve a conectar una API real.

#### 📄 `src/service/Service.js`
- **Capa:** Servicios de dominio (CRUD simulado).
- **Fuente de datos:** importa `src/data/Characters.json` con el alias `personajes`.
- **Simulación de red:** cada operación es `async` y simula la latencia de una API con `setTimeout` envuelto en una promesa: **500ms** en `GetAll`, **300ms** en el resto. No es una API real ni tiene persistencia: la simulación es solo de la *latencia* del llamado.
- **Las 5 funciones que exporta:**

  | Función | Qué hace | ¿Toca datos reales? |
  |---|---|---|
  | `GetAll()` | Espera 500ms y devuelve el array del JSON a cada personaje le añade `id: index` (el UUID original del JSON se reemplaza por un id posicional 0..N, que es el que usa toda la app). | Simulado sobre JSON local |
  | `GetCharacter(id, personajes)` | Espera 300ms y devuelve con `find` el personaje del array en memoria con `id === parseInt(id)`. Devuelve `undefined` si no existe. | Simulado (memoria) |
  | `CreateCharacter(data, personajes)` | Espera 300ms y construye un personaje nuevo con `id: Date.now()` devolviendo `[...personajes, newCharacter]`. | Simulado (memoria) |
  | `EditCharacter(id, data, personajes)` | Espera 300ms y devuelve el **array completo actualizado**: reemplaza el personaje con `id === parseInt(id)` por `{ ...p, ...data }`. ⚠️ Firma nueva: `(id, data, personajes)`; antes era `(id, personajes)` y devolvía un solo personaje. | Simulado (memoria) |
  | `RemoveCharacter(id, personajes)` | Espera 300ms y devuelve el **array filtrado** sin el personaje (`filter` con `p.id !== parseInt(id)`). ⚠️ Cambió: antes devolvía un solo elemento (con el bug del `find` invertido); ahora devuelve la lista sin el personaje. | Simulado (memoria) |

- **Detalle importante sobre los `id`:**
  - Los personajes que vienen del JSON reciben `id: 0, 1, 2, ...` (índice posicional, asignado en `GetAll`).
  - Los personajes creados por el usuario reciben `id: Date.now()` (un número grande, > 1000).
  - `List.jsx` aprovecha esto para diferenciarlos (ver más abajo).

---

### 3.4 `src/page/` — Vistas

#### 📄 `src/page/Home.jsx`
- **Ruta:** `/`
- **Capa:** Vista de bienvenida (landing).
- **Qué hace:**
  - Renderiza el título "⚡ Bienvenido a la magia ∍arkin" y un texto de bienvenida.
  - Muestra una imagen de varita (`assets/pngwing.com4.png`) con la clase `.varita`.
  - No usa ningún estado ni props; es puramente presentacional.
- **Importa:** `assets/pngwing.com4.png` y `components/layout/Home.css` (sus estilos).

#### 📄 `src/page/List.jsx`
- **Ruta:** `/Listado`
- **Capa:** Vista principal del CRUD (lectura de todos + navegación).
- **Props:** `personajes`, `setPersonajes`.
- **Estado interno:** `loading` (boolean) para mostrar el spinner.
- **Qué hace, paso a paso:**
  1. En el `useEffect` (con `[]`, es decir, solo al montar):
     - Marca `loading = true`.
     - Si `personajes.length === 0` (ningún dato aún), llama a `await GetAll()` del servicio (simulación con 500ms de delay sobre el JSON local) y guarda el resultado en `setPersonajes` (sube el estado a `App.jsx`).
     - En el `finally` apaga el `loading`.
     - Captura errores con `console.error`.
  2. **Filtro `personajesLimit`**: combina:
     - Los primeros **22 personajes** de la API (`slice(0, 22)`), y
     - Todos los personajes **creados por el usuario** (los que tienen `id > 1000`, es decir, los de `Date.now()`).
     - Esto evita listar cientos de personajes de la API: solo muestra los primeros 22 + los propios.
  3. Renderiza una **grilla Bootstrap (`row` / `col-md-3`)** de cards (`.card-magica`), una por personaje, mostrando: imagen, nombre, especie, género y casa.
  4. Cada card tiene **3 botones-link**:
     - `Detalle de X ⚡︎` → `/Detalle/{id}` (Read)
     - `Editar a X 🪄` → `/EditarPersonaje/{id}` (Edit)
     - `Eliminar a X 💀` → `/Eliminar/{id}` (Remove)
  5. Mientras `loading` es `true`, renderiza `<Loading />` en su lugar.
- **Importa:** `Service.GetAll`, `Loading`, `list.css`.
- **Nota sobre el límite:** la API original traía ~400 personajes y por eso existía el `slice(0, 22)`; el JSON local conserva todos los personajes y el límite sigue funcionando igual.

#### 📄 `src/page/Read.jsx`
- **Ruta:** `/Detalle/:id`
- **Capa:** Vista de detalle (CRUD - Read).
- **Props:** `personajes`. **Estado interno:** `info` (el personaje), `error` (boolean).
- **Qué hace:**
  1. Lee el `:id` de la URL con `useParams()`.
  2. En un `useEffect` (con `[id, personajes]`), llama a `GetCharacter(id, personajes)` y guarda el resultado en `info`.
  3. Si hay error → renderiza `<Error />` (que es `ErrorMessage.jsx`).
  4. Si aún no hay datos → muestra "Cargando personaje..." (⚠️ ver issue #2 en la sección 5: si el id no existe, `GetCharacter` devuelve `undefined` y queda cargando para siempre, sin mostrar el popup).
  5. Si hay datos → renderiza una card centrada (`.card-detail`) con imagen, nombre, especie, género y casa, más un botón "Volver al listado" (`/Listado`).
- **Importa:** `GetCharacter`, `ErrorMessage`, `Read.css`, `buttom.css`.

#### 📄 `src/page/Create.jsx`
- **Ruta:** `/CrearPersonaje`
- **Capa:** Vista de creación (CRUD - Create). **La más compleja en manejo de estado.**
- **Props:** `personajes`, `setPersonajes` (⚠️ aunque también declara `loading` y `error` en la firma, `App.jsx` nunca se los pasa, así que siempre son `undefined`).
- **Estado con `useReducer` (en lugar de `useState`):**
  - `initialState`: `{ Imagen: "", Nombre: "", Especie: "", Genero: "", Casa: "" }`.
  - `personajeReducer`: un `switch` con 5 acciones (`SET_IMAGEN`, `SET_NOMBRE`, `SET_ESPECIE`, `SET_GENERO`, `SET_CASA`), cada una actualiza un solo campo del formulario con `action.payload`.
- **Flujo al enviar (`handleSubmit`):**
  1. `e.preventDefault()` (evita el submit nativo).
  2. Construye un objeto **traduciendo los nombres en español del formulario a ingles** (los que usa la API/estado): `Imagen → image`, `Nombre → name`, `Especie → species`, `Genero → gender`, `Casa → house`.
  3. Le asigna `id: Date.now()` (¡no usa `Service.CreateCharacter`! Construye el objeto directamente en la vista).
  4. `setPersonajes([...personajes, nuevo])` — agrega al estado global y navega a `/Listado` con `useNavigate`.
- **Render:** muestra una imagen del sombrero seleccionador y un formulario Bootstrap con estilo "pergamino dorado" (gradiente inline en estilos).
- **Importa:** `assets/pngwing.comS.png` (sombrero).

#### 📄 `src/page/Edit.jsx`
- **Ruta:** `/EditarPersonaje/:id`
- **Capa:** Vista de edición (CRUD - Update).
- **Props:** `personajes`, `setPersonajes`. **Estado interno:** `infoP` (los campos editados), `originalName` (para el título), `error`, `loading`.
- **Qué hace (flujo corregido — antes tenía el bug del error al editar):**
  1. Lee `:id` de la URL con `useParams`.
  2. En el `useEffect` (`[id, personajes]`), busca el personaje con `GetCharacter(id, personajes)` (devuelve **un solo personaje**, simula 300ms):
     - Si viene `undefined` → marca `error = true` (muestra `<Error />`).
     - Si existe → carga sus 5 campos (`image`, `name`, `species`, `gender`, `house`) en `infoP` y su nombre en `originalName`.
     - En el `finally` apaga el `loading` (mientras tanto renderiza `<Loading />`).
  3. Cada `<input>` está controlado: `value={infoP.xxx}` + `onChange` que hace `setInfoP({ ...infoP, campo: val })`.
  4. `handleSubmit` (async):
     - Llama al servicio con la **firma nueva**: `await EditCharacter(id, infoP, personajes)` → devuelve el array completo con el personaje ya actualizado.
     - `setPersonajes(nuevos)` y `backPage("/Listado")` (los cambios se ven reflejados en el listado).
  5. Botón "Cancelar" → vuelve a `/Listado` sin guardar.
  6. Si `error` → renderiza `<Error />`.
- **Importa:** `GetCharacter` (carga) y `EditCharacter` (guardado), `ErrorMessage`, `Loading`.

#### 📄 `src/page/Remove.jsx`
- **Ruta:** `/Eliminar/:id`
- **Capa:** Vista de confirmación de borrado (CRUD - Delete).
- **Props:** `personajes`, `setPersonajes`. **Estado interno:** `personajeHP` (el personaje a eliminar), `error`.
- **Qué hace (flujo corregido — antes no mostraba los datos del personaje seleccionado):**
  1. Lee `:id` con `useParams`.
  2. En el `useEffect` (`[id, personajes]`) llama a `GetCharacter(id, personajes)` para **mostrar** el personaje en la confirmación (devuelve un solo personaje, simula 300ms):
     - Si es `undefined` → `error = true` (muestra `<Error />` en vez de un Loading infinito).
     - Si existe → lo guarda en `personajeHP` (conserva un `console.log(response)` para debug).
  3. Mientras `personajeHP` es `undefined`, renderiza `<Loading />`.
  4. `confirmar()` (async) — la eliminación REAL:
     - `await RemoveCharacter(id, personajes)` → el servicio devuelve el **array filtrado** sin el personaje.
     - `setPersonajes(nuevos)` y navega a `/Listado`.
  5. `cancelar()` — navega a `/`.
  6. Render: alerta de confirmación ("¿Estás seguro que deseas eliminar a este mago?"), imagen del mago (`assets/pngegg.png`), datos del personaje, y dos botones: "Avada Kedavra 💀" (confirmar) y "❌ Cancelar".
- **Importa:** `GetCharacter` (mostrar) y `RemoveCharacter` (eliminar), `Loading`, `ErrorMessage`, `assets/pngegg.png`, `remove.css`.

#### 📄 `src/page/NotFound.jsx`
- **Ruta:** `*` (catch-all de `App.jsx`).
- **Capa:** Vista 404 temática.
- **Qué hace:**
  - Texto temático ("la página se ha desvanecido como un hechizo mal lanzado"), imagen del Ministerio (`assets/notFoundImage.png`), y un link botón "Volver a Hogwarts" → `/`.
- **Importa:** `Link` de react-router-dom, `notFound.css`, `assets/notFoundImage.png`.

#### 📄 `src/page/ErrorMessage.jsx`
- **Capa:** Popup de error reutilizable (no es una ruta; la usan `Read`, `Edit` y `Remove`).
- **Qué hace:**
  - Lanza directamente `Swal.fire(...)` (SweetAlert2) con:
    - Título "Harry Potter", texto "Personaje no encontrado..." e inserta el **ASCII art** de `components/iu/iconMessage.jsx` dentro del HTML del popup.
    - Botón "Volver al listado".
  - Al confirmar el popup (`.then()`), navega a `/Listado` con `useNavigate`.
  - ⚠️ Detalle técnico: invoca `Swal.fire` **en el cuerpo del componente**, es decir, como efecto secundario directo del render (ver issue #4, sección 5).
- **Conexiones:** la usa `Read.jsx` y `Edit.jsx` (y `Remove.jsx`).

---

### 3.5 `src/components/` — Componentes compartidos

#### 📄 `src/components/Header.jsx`
- **Capa:** Componente de layout global.
- **Renderiza:** el logo "⚡", el título "Hogwarts Mistery", un subtítulo con subrayado mágico, y las 4 casas de Hogwarts como "chips" de colores (`.house.gryffindor`, `.slytherin`, `.ravenclaw`, `.hufflepuff`).
- **Conexiones:** estilos en `components/layout/Header.css`; lo renderiza `App.jsx` en todas las rutas.

#### 📄 `src/components/NavigationBar.jsx`
- **Capa:** Componente de navegación global.
- **Renderiza:**
  - Un navbar Bootstrap (`.navbar-expand-lg`) con el logo (imagen `assets/pngwing.com.png`) que enlaza a `/`.
  - Botón hamburguesa (colapsable en móvil, usa `data-bs-toggle` → necesita el JS de Bootstrap cargado por CDN en `index.html`).
  - Links:
    | Texto | Destino | Clase de color |
    |---|---|---|
    | Inicio | `/` | `.gryffindor` |
    | Listado | `/Listado` | `.slytherin` |
    | Crear Personaje | `/CrearPersonaje` | `.ravenclaw` |

#### 📄 `src/components/Footer.jsx`
- **Capa:** Componente de pie de página global.
- **Renderiza:** una sola línea "⚡ Proyecto Hogwarts Wizard". Estilos en `Footer.css`.

#### 📄 `src/components/Loading.jsx`
- **Capa:** Componente de UI de carga.
- **Renderiza:** un overlay oscuro con un spinner animado (`.loading-spinner`) y el texto "LOADING...".
- **Quién lo usa:** `List.jsx` (carga inicial de la API) y `Remove.jsx` (mientras busca el personaje).

#### 📄 `src/components/iu/iconMessage.jsx`
- **Capa:** Pieza de UI.
- **Qué hace:** Exporta por defecto un **string de HTML** con un `<pre class="ascii-art">` que contiene un dibujo ASCII grande de Harry Potter. No es un componente React: es un string que se interpola dentro del HTML del popup de SweetAlert (en `ErrorMessage.jsx`). Su estilo viene de `iconMessage.css` (que él mismo importa).

---

### 3.6 Estilos (`src/components/layout/` y `src/components/iu/`)

| Archivo | A quién estiliza | Qué aporta |
|---|---|---|
| `layout/App.css` | `App.jsx` | Contenedor global `.hp-container` |
| `layout/Header.css` | `Header.jsx` | Cabecera, título, chips de casas |
| `layout/NavigationBar.css` | `NavigationBar.jsx` | Navbar, logo, colores por casa en los links |
| `layout/Footer.css` | `Footer.jsx` | Pie de página |
| `layout/Home.css` | `Home.jsx` | Título de bienvenida y varita |
| `layout/list.css` | `List.jsx` | Grid de cards `.card-magica` |
| `layout/Read.css` | `Read.jsx` | Card de detalle `.card-detail` |
| `layout/remove.css` | `Remove.jsx` | Contenedor de confirmación |
| `layout/notFound.css` | `NotFound.jsx` | 404 temático (`.nf-*`) |
| `layout/Loading.css` | `Loading.jsx` | Overlay y spinner |
| `iu/iconMessage.css` | `iconMessage.jsx` | Estiliza el `<pre>` del ASCII art |
| `iu/buttom.css` | `Read.jsx` (y otros) | Clases de botones propias (`.btn-listado-read`) |

Estos archivos **cada JSX los importa directamente** (no hay un `index.css` central que agrupe todo), por lo que Vite los inyecta cuando se carga cada componente.

> 📝 Convención de nombres MIXTA en el proyecto: `list.css`/`remove.css` en minúscula vs `Read.css`/`Home.css` en CapitalCase, y la carpeta se llama `iu` (poco convencional; normalmente sería `ui`). Ver sugerencias en sección 6.

---

### 3.7 `src/assets/` — Imágenes

| Imagen | Usada en | Contenido |
|---|---|---|
| `pngwing.com.png` | `NavigationBar.jsx` | Logo de Hogwarts |
| `pngwing.com4.png` | `Home.jsx` | Varita mágica |
| `pngwing.comS.png` | `Create.jsx` | Sombrero seleccionador |
| `pngegg.png` | `Remove.jsx` | Mago (para la confirmación de borrado) |
| `notFoundImage.png` | `NotFound.jsx` | Ministerio de Magia (404) |
| `pngwing.com3.png` | (sin uso) | Backup |
| `6127d693aa481f0004...png` | (sin uso) | Backup |
| `harry-potter-page.html` + `harry-potter-page_files/` | (no parte de la app) | Página web de referencia guardada con "Guardar como..." |

> En el build (`dist/assets/`) Vite renombra las imágenes con un hash (ej. `pngwing.com4-Cvj2-wR2.png`) para cache-busting.

---

### 3.8 `public/`

- **`harry-potter-icon.webp`** → Favicon referenciado por `index.html`. En `public/` porque se copia **tal cual** a la raíz del build (sin hash ni procesamiento).

---

## 4. Flujo de datos

### 4.1 Flujo de arranque

```
Navegador
   │
   ▼
index.html (Bootstrap por CDN + #root + script main.jsx)
   │
   ▼
main.jsx → BrowserRouter (basename="/Harry-Potter") + StrictMode
   │
   ▼
App.jsx → crea el estado global "personajes" = []
   │
   ▼
Decodifica la URL → renderiza la vista correspondiente + Header/Nav/Footer
```

### 4.2 Flujo de carga de datos (la primera vez que se entra a /Listado)

```
List.jsx (monta)
   │  useEffect: personajes.length === 0 ?
   ▼
Service.GetAll()                     ← capa de servicio
   │  setTimeout 500ms (simulación de latencia)
   ▼
src/data/Characters.json (import con alias)  ← datos locales (ex API externa)
   │  data → data.map((p, i) => ({...p, id: i}))
   ▼
setPersonajes(data)                  ← SUBE el estado a App.jsx
   │
   ▼
App.jsx re-renderiza → List recibe personajes → se pintan las cards
```

Si la persona recarga la página, el estado global se reinicia a `[]` y `List` vuelve a pedir los datos al servicio (nueva simulación de 500ms sobre el JSON). Si navega a otra vista y regresa a `/Listado` sin recargar, el `useEffect` no vuelve a pedir nada porque `personajes.length !== 0`.

### 4.3 Flujo de una "escritura" (Create / Edit / Remove)

```
Vista (Create/Edit/Remove)
   │  handleSubmit / confirmar
   ▼
Service.CreateCharacter / EditCharacter / RemoveCharacter
   │  setTimeout 300ms (simulación de latencia)
   ▼
devuelve el nuevo array (append / update / filter)
   │
   ▼
setPersonajes(nuevoArray)     ← modifica el estado de App.jsx
   │
   ▼
useNavigate("/Listado")       ← redirige
   │
   ▼
List.jsx re-renderiza con el nuevo array (ya no vuelve a pedir los datos: length > 0)
```

⚠️ **Importante:** las escrituras NO viajan a ninguna API. Todo vive en memoria del navegador (state de React) y **se pierde al recargar**. Por decisión del proyecto NO se agregará persistencia: es una **simulación de un llamado a una API**, no una API real (ver restricciones).

### 4.4 Prop drilling actual

`personajes` / `setPersonajes` bajan de `App.jsx` → (vistas). Hoy solo hay un nivel, así que el patrón de props es viable. Si la app creciera (más vistas anidadas, más estados globales), valdría la pena migrar a Context API o React Query (ver sugerencias).

---

## 5. ⚠️ Issues detectados (estado y descripción)

### Issue #1 — ✅ RESUELTO: bug de `RemoveCharacter` y del `Remove.jsx`
- **Era:** `RemoveCharacter` usaba `find` con la condición invertida (`p.id !== parseInt(id)`) y devolvía casi siempre el primer personaje; `Remove.jsx` por eso no mostraba los datos del personaje seleccionado en la confirmación.
- **Estado:** RESUELTO en dos partes:
  1. El servicio ahora hace `filter` correcto y devuelve el **array sin el personaje**.
  2. `Remove.jsx` ahora carga el personaje a mostrar con `GetCharacter(id, personajes)` y elimina con el array que devuelve `RemoveCharacter` en `confirmar()`. Si el personaje no existe muestra `<Error />` en vez de Loading infinito.

### Issue #2 — 🟡 PENDIENTE: `Read.jsx` queda "Cargando..." infinito si el id no existe
- **Dónde:** `src/page/Read.jsx` (y la causa raíz en `Service.js` → `GetCharacter`).
- **Problema:** `GetCharacter` usa `find`, que devuelve `undefined` cuando no hay coincidencia. En `Read.jsx`, `useEffect` llama a `GetCharacter`, entra al `catch` solo si **lanza excepción** (pero `find` no lanza excepciones...), así que `info` queda en `null` y se renderiza "Cargando personaje..." para siempre, **sin** mostrar el popup de `ErrorMessage`.
- **Efecto:** si el usuario entra a `/Detalle/9999` (id inexistente), ve carga infinita.
- **Nota:** `Edit.jsx` y `Remove.jsx` ya manejan este caso (`if (!response) setError(true)`); `Read.jsx` debería imitarlos.
- **Corrección conceptual:** en `Read.jsx` comprobar `if (!data) → mostrar error / ErrorMessage`, o que el servicio lance una excepción cuando no encuentre el personaje.

### Issue #3 — ⛔ NO APLICA: persistencia de los datos
- **Contexto:** el CRUD no tiene persistencia; todo vive en memoria del navegador y se pierde al recargar.
- **Decisión del proyecto (restricción):** NO se agregará persistencia (localStorage/backend). La app es una **simulación de un llamado a una API**, no una API real; el comportamiento "datos base + estado en memoria" es intencional. Este issue queda cerrado como "no aplica".

### Issue #4 — 🟠 `ErrorMessage.jsx` dispara `Swal.fire` durante el render
- **Dónde:** `src/page/ErrorMessage.jsx`.
- **Problema:** `Swal.fire(...)` se invoca en el cuerpo del componente (no en un `useEffect`). El render de un componente no debería tener side effects: bajo `StrictMode` en desarrollo React monta/desmonta doblemente, y en versiones futuras esto se comportará distinto. Es frágil.
- **Sugerencia conceptual:** mover la llamada a un `useEffect(() => { Swal.fire(...).then(() => navigate(...)) }, [])`.

### Issue #5 — 🟠 `Create.jsx` declara props que nunca recibe (y no usa su propio servicio)
- **Dónde:** `src/page/Create.jsx`.
- **Problemas:**
  1. Firma: `({ personajes, setPersonajes, loading, error })` — pero `App.jsx` solo pasa `personajes` y `setPersonajes`; `loading` y `error` siempre serán `undefined` (el render tiene ramas de `loading`/`error` que jamás se activan).
  2. La vista **no utiliza** `Service.CreateCharacter`: construye el nuevo objeto manualmente con `id: Date.now()` (duplica la lógica que ya existe en el servicio y lo deja sin uso).
- **Sugerencia conceptual:** eliminar las props fantasma y usar (o eliminar) `CreateCharacter`.

### Issue #6 — 🟢 Menores / de nombrado
- Carpeta `src/components/iu/` — normalmente sería `ui` (typo no crítico).
- Nombres de CSS mezclados: `list.css` vs `Read.css` / `Home.css` (consistencia de `lowercase` vs `CapitalCase`).
- `opencode-ai` está en `dependencies` de `package.json` pero no se usa en el código.
- `src/service/Api.js` quedó obsoleto (se conserva por decisión del proyecto, documentada en 3.3).
- `src/assets/harry-potter-page.html` + `harry-potter-page_files/` son basura de referencia que conviene mover fuera de `src/` (o a una carpeta `_docs/`) para no ensuciar el build.
- En `index.html` la etiqueta `lang="en"` está en inglés, pero toda la UI está en español (debería ser `lang="es"`).
- `Documentation.txt` (del propio autor) ya registaba: separar lógica/diseño/componentes para escalabilidad y mejorar el popup de "no encontrado" a estilo dark.

---

## 6. Roadmap de mejoras sugeridas (priorizadas)

> Basado en los issues anteriores + las notas de `Documentation.txt`. **Nada de esto está implementado.**

| Prioridad | Tarea |
|---|---|
| 🔴 Alta | Manejar `undefined` en `Read.jsx` con `ErrorMessage` (evitar loading infinito) |
| 🟠 Media | Mover `Swal.fire` de `ErrorMessage.jsx` a un `useEffect` |
| 🟠 Media | Centralizar los estilos inline de `Create/Edit` en CSS propios (los gradientes dorados están hardcodeados en JSX) |
| 🟡 Baja | Consistencia de nombres (carpeta `iu` → `ui`, CSS todo en un solo estilo) |
| 🟡 Baja | Limpiar assets sin uso y la página de referencia de `src/assets/` |
| 🟡 Baja | Migrar estado de personajes a Context (si la app crece) |
| 🟡 Baja | Cambiar `lang="en"` → `lang="es"` en `index.html` |

> ⛔ Excluidas por restricción del proyecto: persistencia (localStorage/backend) — es una simulación de llamada a API, no una API real. Excluida también cualquier librería externa nueva.

---

## 7. Glosario rápido

| Término | Significado en este proyecto |
|---|---|
| `personajes` | Array de objetos (imagen, nombre, especie, género, casa, id) que vive en `App.jsx` |
| `setPersonajes` | Única forma de modificar ese array (baja de `App.jsx` a las vistas por props) |
| `Characters.json` | Copia local de los datos de personajes (ex API externa suspendida); vive en `src/data/` |
| `id posicional` | id 0..N que se asigna a los personajes que vienen del JSON (`Service.GetAll`) |
| `id Date.now()` | id grande (>1000) de los personajes creados por el usuario; `List.jsx` los usa para separarlos de los del JSON |
| Simulación de API | `setTimeout` (500ms/300ms) en `Service.js` para simular la latencia de un llamado a una API |
| Lifting state up | Patrón de React de subir el estado al ancestro común (`App.jsx`) y bajarlo por props |
| Prop drilling | Pasar props a través de varios niveles (en este proyecto: solo `App.jsx` → vistas) |
| Base path | `/Harry-Potter/`: prefijo en Vite (`base`) y en el Router (`basename`), necesario para GitHub Pages |
