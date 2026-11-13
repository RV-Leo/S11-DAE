# S11-DAE — Laboratorio 11: Comunicación entre componentes

Extiende Aurora Cinemas con comunicación entre hermanos, hooks propios y estados de carga/error.
Se evalúan estado compartido, extracción de lógica y bibliotecas de interfaz.
Rama: `lab-11`.

## Estructura agéntica

```mermaid
flowchart TD
    H(["👤 Alumno lanza la ventana"]) --> O
    subgraph TEAM["Equipo agéntico — roles que corren en secuencia dentro de UNA sesión de Codex"]
        O["🧭 Orchestrator<br/>lee LAB-11.md y docs/PROGRESS.md<br/>decide el siguiente paso"]
        B["🏗️ Builder<br/>escribe el código del paso"]
        D["🎨 Designer<br/>tokens · layout · a11y · responsive"]
        V["🧪 Verifier<br/>lint · build · tests"]
        S["📝 Scribe<br/>README · docs/PROGRESS.md"]
        G["🔒 Git Steward<br/>commits locales agrupados<br/>push único al cierre"]
    end
    O --> B --> D --> V
    V -- "falla" --> B
    V -- "pasa" --> S --> G
    G -- "siguiente paso" --> O
    G --> R[("GitHub<br/>repo S11-DAE")]
    G -. "commit local + push final" .-> R
```

```text
 ┌────────────────────── CICLO DE TRABAJO ────────────────────────┐
 │ [PLAN] → [BUILD] → [DESIGN] → [VERIFY] → [NOTES] → [COMMIT]   │
 │   ▲                      │                         │           │
 │   └──────────────── falla┘            grupos cortos│           ▼
 │                                           [PUSH ÚNICO] → [ESTADO]
 └─────────────────────────────────────────────────────────────────┘
```

## Arquitectura del laboratorio

```mermaid
flowchart TD
    raw[("rawListings.js<br/>formato API")] --> adapter["movieAdapter<br/>adaptMovie / adaptMovies"]
    adapter --> App
    App["App · ancestro común<br/>favoriteIds · query"]
    App -->|"favoritesCount (solo el número)"| Header
    App -->|"query · onQueryChange · onClearQuery"| Hero
    Hero --> MovieSearch
    App -->|"movies · query · favoriteIds"| MovieList
    MovieList --> MovieCard
    MovieCard -. "onToggleFavorite ↑" .-> App
    App -. "aviso" .-> notify["notify.js → react-hot-toast"]
    App --> PremieresSection
    PremieresSection --> usePremieres["usePremieres<br/>loading · success · error"]
    PremieresSection --> Skeleton
    PremieresSection --> Carousel["PremieresCarousel · Swiper"]
    MovieSearch --> useDebounce
    Header --> useWindowSize
    MovieList --> useWindowSize
    Carousel --> useWindowSize
```

## Árbol previsto

```text
S11-DAE/
├── AGENTS.md · README.md · docs/PROGRESS.md
└── cinema-app/
    ├── public/posters/
    └── src/
        ├── App.jsx · App.test.jsx · main.jsx
        ├── data/ (rawListings · rawPremieres · movies)
        ├── hooks/ (useDebounce · useWindowSize · usePremieres)
        ├── services/notify.js · utils/movieAdapter.js · styles/
        ├── test/setup.js
        └── components/
            ├── Button/ · Header/ · Footer/ · Hero/
            ├── MovieSearch/ · MovieList/ · MovieCard/
            └── Premieres/ (Skeleton · PremieresCarousel · PremieresSection)
```

## Comandos y reglas

En `cinema-app/`: `npm install`, `npm run dev`, `npm run lint`, `npm run build`, `npm test`.
Código en inglés; documentación en español. No subir dependencias instaladas, `dist` ni secretos. Commits locales agrupados y push único al final según preferencia del alumno.

Dependencias principales: React 19, Vite 8, Vitest 5, React Hot Toast 2.6 y Swiper 14.

## Diseño y terminado

Se conserva el diseño oscuro y ámbar de Aurora, CSS por componente, foco visible y layout adaptable. El laboratorio termina con búsqueda/favoritas, hooks compartidos, carrusel con estados de carga/error, README/PROGRESS actualizados y lint, build y pruebas aprobados.
