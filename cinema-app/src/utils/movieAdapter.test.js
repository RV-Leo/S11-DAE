import { describe, expect, it } from 'vitest'
import { adaptMovie, adaptMovies } from './movieAdapter.js'

describe('movie adapter', () => {
  it('converts raw listing values to the app model', () => {
    const movie = adaptMovie({ id: 'x', titulo: 'Luna', valoracion: '8.4', horarios: ['18:00'], imagen_url: '/luna.svg', destacada: true })
    expect(movie).toMatchObject({ id: 'x', title: 'Luna', rating: 8.4, showtimes: ['18:00'], posterUrl: '/luna.svg', featured: true })
    expect(typeof movie.rating).toBe('number')
  })

  it('uses safe defaults for missing fields and adapts lists', () => {
    expect(adaptMovie({ titulo: 'Sin datos', valoracion: 'no' })).toMatchObject({ id: 'unknown', title: 'Sin datos', rating: 0, showtimes: [], ageRating: 'A' })
    expect(adaptMovies([{ titulo: 'Una' }])).toHaveLength(1)
  })
})
