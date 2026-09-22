const API_URL = 'http://localhost:8080/api/auth'

export async function register(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })

  if (!response.ok) {
    throw new Error('Registration failed')
  }

  return response.json()
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const data = await response.json()
  localStorage.setItem('token', data.token)

  return data
}
