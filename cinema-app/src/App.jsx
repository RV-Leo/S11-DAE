import { useEffect, useState } from 'react'
import { movies } from './data/movies.js'
import { Header } from './components/Header/Header.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { Hero } from './components/Hero/Hero.jsx'
import { MovieSearch } from './components/MovieSearch/MovieSearch.jsx'
import { MovieList } from './components/MovieList/MovieList.jsx'
import { readFavorites, writeFavorites } from './utils/favoritesStorage.js'
import { Toaster } from 'react-hot-toast'
import { notifyFavoriteChange } from './services/notify.js'
import { useDebounce } from './hooks/useDebounce.js'
import { PremieresSection } from './components/Premieres/PremieresSection.jsx'

export default function App() {
  const featuredMovie = movies.find((movie) => movie.featured)
  const shouldFailPremieres = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('premieres') === 'error'
  const [favoriteIds, setFavoriteIds] = useState(() => readFavorites())
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => writeFavorites(favoriteIds), [favoriteIds])

  function toggleFavorite(id) {
    const movie = movies.find((item) => item.id === id)
    const added = !favoriteIds.includes(id)
    setFavoriteIds((currentIds) => currentIds.includes(id)
      ? currentIds.filter((favoriteId) => favoriteId !== id)
      : [...currentIds, id])
    if (movie) notifyFavoriteChange(movie.title, added)
  }

  return (
    <>
      <Header favoritesCount={favoriteIds.length} />
      <main>
        <Hero movie={featuredMovie} query={query} onClearQuery={() => setQuery('')}>
          <MovieSearch value={query} onChange={setQuery} />
        </Hero>
        <MovieList movies={movies} query={debouncedQuery} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
        <PremieresSection shouldFail={shouldFailPremieres} />
      </main>
      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { border: '1px solid var(--color-ink-700)', borderRadius: 'var(--radius-control)', background: 'var(--color-ink-800)', color: 'var(--color-ivory-100)', fontFamily: 'var(--font-ui)' } }} />
    </>
  )
}
