# Progreso del laboratorio 11

## Pasos

- [x] Paso 00 — Guía del agente y registro — `ac7928a` · 2026-11-13 00:34 -05
- [x] Paso 01 — Base lab 10, rama `lab-11` — `734e9ea` · 2026-11-13 00:37 -05
- [x] Pasos 02–10 — Estilos, adaptador, toasts, hooks, estrenos simulados, contador y filtro — `594f6b3` · 2026-11-13 00:45 -05
- [x] Pasos 11–12 — Árbol de componentes, decisiones y cierre README — `8c461e5` · 2026-11-13 00:47 -05

Se agruparon pasos relacionados en tres commits de trabajo y un push final de la rama.

## Decisiones

- Se copió la aplicación del lab 10; se conservaron los ids slug y se movieron pósters/favicon a `public/` para que Vite los incluya en producción.
- `App` es ancestro común de `Header` y `MovieCard`: mantiene ids, calcula `favoritesCount` y pasa solo el número al Header.
- `useWindowSize` se comparte entre Header, MovieList y PremieresCarousel; `usePremieres` recibe el modo de error como opción, no lee `window`.
- `?premieres=error` fuerza el estado de error; la carga simulada usa 1.2 s y muestra Skeleton, error con reintento o carrusel.
- Los commits se agruparon y el push se reserva para el cierre, según la preferencia del alumno. El brief no especifica la URL; se verificará `RV-Leo/S11-DAE` antes de publicar.
- No se genera entregable ni capturas para el campus.

## Hallazgos

- La guía pide datos crudos en español y un adaptador antes de que la interfaz consuma películas. `movieAdapter` convierte `valoracion` en número y `imagen_url` en `posterUrl`.
- La búsqueda usa `useDebounce`; `Header`, `MovieList` y `PremieresCarousel` reaccionan al mismo hook de tamaño de ventana.
- Pruebas: al renderizar `Toaster` en jsdom apareció `matchMedia is not a function`; se añadió un mock básico en `src/test/setup.js`.
- Verificación final: lint y build pasan; Vitest: 14 archivos, 23 pruebas aprobadas. Vite respondió HTTP 200 en localhost antes de los cambios finales.
- Playwright no está instalado; no se hicieron capturas a 390/1440 px. Las reglas responsive están en CSS y el número de columnas se deriva del ancho del hook.
