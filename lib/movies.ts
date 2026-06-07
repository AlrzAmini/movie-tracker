import { kv } from '@vercel/kv'
import { randomUUID } from 'crypto'

export type Movie = { id: string; title: string; rating: number; notes: string }

export async function getMovies(): Promise<Movie[]> {
  return (await kv.get<Movie[]>('movies')) ?? []
}

export async function addMovie(data: Omit<Movie, 'id'>): Promise<Movie> {
  const movies = await getMovies()
  const movie = { id: randomUUID(), ...data }
  await kv.set('movies', [...movies, movie])
  return movie
}

export async function updateMovie(id: string, data: Partial<Movie>): Promise<Movie | null> {
  const movies = await getMovies()
  const updated = movies.map(m => m.id === id ? { ...m, ...data } : m)
  await kv.set('movies', updated)
  return updated.find(m => m.id === id) ?? null
}

export async function deleteMovie(id: string): Promise<void> {
  const movies = await getMovies()
  await kv.set('movies', movies.filter(m => m.id !== id))
}
