import { cookies } from 'next/headers'

const USERNAME = 'rizze'
const PASSWORD = 'xs24'
const SESSION_COOKIE = 'session'
const SESSION_VALUE = 'authenticated'

export function validateCredentials(username: string, password: string): boolean {
  return username === USERNAME && password === PASSWORD
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE
}

export { SESSION_COOKIE, SESSION_VALUE }
