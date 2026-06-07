'use client'
import { Movie } from '@/lib/movies'

interface Props {
  movie: Movie
  onEdit: (movie: Movie) => void
  onDelete: (id: string) => void
}

export default function MovieCard({ movie, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-800 leading-tight">{movie.title}</h2>
        <span className="text-sm font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full whitespace-nowrap">
          ⭐ {movie.rating}/10
        </span>
      </div>
      {movie.notes && <p className="text-sm text-gray-600">{movie.notes}</p>}
      <p className="text-xs text-gray-400">{new Date(movie.dateAdded).toLocaleDateString()}</p>
      <div className="flex gap-2 mt-1">
        <button
          onClick={() => onEdit(movie)}
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
