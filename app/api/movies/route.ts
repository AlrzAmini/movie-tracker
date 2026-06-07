import { NextRequest, NextResponse } from 'next/server'
import { readMovies, writeMovies, Movie } from '@/lib/movies'
import { isAuthenticated } from '@/lib/auth'
import { randomUUID } from 'crypto'

async function guard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function GET() {
  const err = await guard(); if (err) return err
  const movies = await readMovies()
  return NextResponse.json(movies)
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { title, rating, notes } = await req.json()
  if (!title || rating == null) {
    return NextResponse.json({ error: 'title and rating are required' }, { status: 400 })
  }
  const movies = await readMovies()
  const movie: Movie = {
    id: randomUUID(),
    title: String(title).trim(),
    rating: Number(rating),
    notes: String(notes ?? '').trim(),
    dateAdded: new Date().toISOString(),
  }
  movies.push(movie)
  await writeMovies(movies)
  return NextResponse.json(movie, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id, title, rating, notes } = await req.json()
  if (!id || !title || rating == null) {
    return NextResponse.json({ error: 'id, title and rating are required' }, { status: 400 })
  }
  const movies = await readMovies()
  const idx = movies.findIndex(m => m.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  movies[idx] = { ...movies[idx], title: String(title).trim(), rating: Number(rating), notes: String(notes ?? '').trim() }
  await writeMovies(movies)
  return NextResponse.json(movies[idx])
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const movies = await readMovies()
  const filtered = movies.filter(m => m.id !== id)
  if (filtered.length === movies.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await writeMovies(filtered)
  return NextResponse.json({ success: true })
}
