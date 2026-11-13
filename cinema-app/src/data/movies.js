import { rawListings } from './rawListings.js'
import { adaptMovies } from '../utils/movieAdapter.js'

export const movies = adaptMovies(rawListings)
