'use client'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/login')
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <span className="text-lg font-semibold tracking-wide">🎬 Movie Notebook</span>
      <button
        onClick={logout}
        className="text-sm bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded transition"
      >
        Logout
      </button>
    </nav>
  )
}
