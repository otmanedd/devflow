const API_URL = 'http://localhost:8080/api/issues'

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

export async function getIssues() {
  const response = await fetch(API_URL, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to load issues')
  }

  return response.json()
}

export async function updateIssue(id: number, data: object) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update issue')
  }

  return response.json()
}

export async function createIssue(
  title: string,
  description: string,
  priority: string,
  projectId: number
) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      title,
      description,
      priority,
      project: { id: projectId },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create issue')
  }

  return response.json()
}

export async function deleteIssue(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to delete issue')
  }
}
