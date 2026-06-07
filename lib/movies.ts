import fs from 'fs/promises'
import path from 'path'

export interface Movie {
  id: string
  title: string
  rating: number
  notes: string
  dateAdded: string
}

const DATA_PATH = path.join(process.cwd(), 'data', 'movies.json')

export async function readMovies(): Promise<Movie[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(raw) as Movie[]
  } catch {
    return []
  }
}

export async function writeMovies(movies: Movie[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(movies, null, 2), 'utf-8')
}
