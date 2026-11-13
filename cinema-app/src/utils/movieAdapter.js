export function adaptMovie(raw) {
  const rating = Number(raw.valoracion)
  return {
    id: String(raw.id ?? 'unknown'),
    title: String(raw.titulo ?? 'Sin título'),
    posterUrl: String(raw.imagen_url ?? '/posters/last-lantern.svg'),
    synopsis: String(raw.sinopsis ?? ''),
    ageRating: String(raw.clasificacion ?? 'A'),
    rating: Number.isFinite(rating) ? rating : 0,
    showtimes: Array.isArray(raw.horarios) ? raw.horarios : [],
    featured: Boolean(raw.destacada),
  }
}

export function adaptMovies(list) {
  return list.map(adaptMovie)
}
