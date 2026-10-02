const API_URL = 'http://localhost:8080/api'

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

export async function getWorkspaces() {
  const response = await fetch(`${API_URL}/workspaces`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to load workspaces')
  }

  return response.json()
}

export async function createWorkspace(name: string) {
  const response = await fetch(`${API_URL}/workspaces`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Error('Failed to create workspace')
  }

  return response.json()
}

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to load projects')
  }

  return response.json()
}

export async function createProject(
  name: string,
  description: string,
  workspaceId: number
) {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      name,
      description,
      workspace: { id: workspaceId },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create project')
  }

  return response.json()
}
