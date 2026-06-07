'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    setLoading(false)
    if (!res.ok) {
      setError('Invalid username or password.')
      return
    }
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 w-full max-w-sm flex flex-col gap-5"
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🎬</div>
          <h1 className="text-xl font-bold text-gray-800">Movie Notebook</h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            value={username} onChange={e => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin"
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit" disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm py-2 rounded-lg transition font-medium"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
