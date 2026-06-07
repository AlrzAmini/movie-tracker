'use client'
import { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import MovieForm from '@/components/MovieForm'
import { Movie } from '@/lib/movies'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [editing, setEditing] = useState<Movie | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

 const fetchMovies = useCallback(async () => {
  const res = await fetch('/api/movies')
  if (res.ok) setMovies(await res.json())
  setLoading(false)
}, [])

  useEffect(() => { fetchMovies() }, [fetchMovies])

  function handleEdit(movie: Movie) {
    setEditing(movie)
    setShowForm(true)
  }

  function handleAdd() {
    setEditing(null)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditing(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this movie?')) return
    await fetch('/api/movies', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchMovies()
  }

  async function handleSaved() {
    setShowForm(false)
    setEditing(null)
    fetchMovies()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">My Movies</h1>
          {!showForm && (
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              + Add Movie
            </button>
          )}
        </div>

        {showForm && (
          <MovieForm editing={editing} onSaved={handleSaved} onCancel={handleCancel} />
        )}

        {loading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : movies.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">🎥</div>
            <p className="text-sm">No movies yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {movies.map(m => (
              <MovieCard key={m.id} movie={m} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
