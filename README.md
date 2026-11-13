# Laboratorio 11 — Comunicación entre componentes

Aurora Cinemas continúa el lab 10 con adaptación de datos, hooks propios, favoritas compartidas y una sección de estrenos simulados.

## Ejecutar

Desde PowerShell, entra a `cinema-app/`, instala dependencias con `npm install` y ejecuta `npm run dev`. Verifica con `npm run lint`, `npm run build` y `npm test`.

Versiones: React 19.3, Vite 8.3, Vitest 5.1, React Hot Toast 2.6 y Swiper 14. Autor: Leonardo Ronda.

## Árbol de componentes y estado

```text
App — favoriteIds, query; decide shouldFailPremieres desde la URL
├── Header — recibe favoritesCount (solo el número)
├── Hero — recibe query y onClearQuery
│   └── MovieSearch — value y onChange controlados por App
├── MovieList — recibe cartelera, debouncedQuery y favoritas
│   └── MovieCard — deriva isFavorite y avisa con onToggleFavorite(id)
└── PremieresSection — usePremieres: loading / success / error
    └── PremieresCarousel — usa Swiper y useWindowSize
```

`Header` y `MovieCard` viven en ramas distintas, así que la cabecera no puede calcular el total desde una lista que no recibe. `App` es el ancestro común: conserva `favoriteIds`, calcula `favoritesCount` y pasa el número a `Header`; el cambio de una tarjeta sube por `onToggleFavorite`.

## Hooks y comunicación

| Hook | Lo usa | Lógica extraída |
|---|---|---|
| `useDebounce` | `App` | Retarda el texto de búsqueda y limpia el temporizador anterior. |
| `useWindowSize` | `Header`, `MovieList`, `PremieresCarousel` | Comparte dimensiones y escucha `resize` con limpieza. |
| `usePremieres` | `PremieresSection` | Simula carga, éxito/error y reintento. |

`movieAdapter` convierte `rawListings` y `rawPremieres` a los objetos que consumen las vistas. El error de estrenos se muestra con `?premieres=error`; se puede probar el estado normal cargando la página sin ese parámetro.

Los estilos globales se importan en orden: tokens, base, layout, forms y utilities; cada componente mantiene su CSS al lado de su JSX. No se creó el entregable ni capturas para el campus.
