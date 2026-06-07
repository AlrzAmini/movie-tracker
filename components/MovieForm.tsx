'use client'
import { useState, useEffect } from 'react'
import { Movie } from '@/lib/movies'

interface Props {
  editing: Movie | null
  onSaved: () => void
  onCancel: () => void
}

export default function MovieForm({ editing, onSaved, onCancel }: Props) {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editing) {
      setTitle(editing.title)
      setRating(String(editing.rating))
      setNotes(editing.notes)
    } else {
      setTitle(''); setRating(''); setNotes('')
    }
    setError('')
  }, [editing])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const r = Number(rating)
    if (!title.trim()) return setError('Title is required.')
    if (!rating || r < 1 || r > 10) return setError('Rating must be between 1 and 10.')

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/movies', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editing?.id, title: title.trim(), rating: r, notes: notes.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong.')
        return
      }
      onSaved()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">{editing ? 'Edit Movie' : 'Add Movie'}</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Title *</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Movie title"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Rating (1–10) *</label>
        <input
          type="number" min={1} max={10} value={rating}
          onChange={e => setRating(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 8"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Your thoughts..."
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit" disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          {loading ? 'Saving…' : editing ? 'Save Changes' : 'Add Movie'}
        </button>
        <button
          type="button" onClick={onCancel}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
