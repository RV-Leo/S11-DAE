import { useCallback, useEffect, useState } from 'react'
import { rawPremieres } from '../data/rawPremieres.js'
import { adaptMovies } from '../utils/movieAdapter.js'

export function usePremieres({ shouldFail = false } = {}) {
  const [status, setStatus] = useState('loading')
  const [premieres, setPremieres] = useState([])
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(() => {
      const request = shouldFail
        ? Promise.reject(new Error('No se pudieron cargar los estrenos simulados.'))
        : Promise.resolve(adaptMovies(rawPremieres))
      request.then((data) => {
        if (!cancelled) {
          setPremieres(data)
          setStatus('success')
        }
      }).catch((requestError) => {
        if (!cancelled) {
          setError(requestError)
          setStatus('error')
        }
      })
    }, 1200)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [shouldFail, attempt])

  const reload = useCallback(() => {
    setStatus('loading')
    setError(null)
    setAttempt((current) => current + 1)
  }, [])
  return { status, premieres, error, reload }
}
