import { useEffect, useState } from 'react'
import { login, register } from './api/auth'
import { getIssues, updateIssue, createIssue, deleteIssue } from './api/issues'
import { getProjects } from './api/workspace'

type Project = {
  id: number
  name: string
}

type Issue = {
  id: number
  title: string
  description: string
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
}

const columns = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'REVIEW', title: 'Review' },
  { id: 'DONE', title: 'Done' },
] as const

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const [isRegister, setIsRegister] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const [issues, setIssues] = useState<Issue[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPriority, setNewPriority] = useState('MEDIUM')
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('ALL')

  useEffect(() => {
    if (!loggedIn) return

    getIssues()
      .then(setIssues)
      .catch(() => setMessage('Could not load issues.'))

    getProjects()
      .then(setProjects)
      .catch(() => setMessage('Could not load projects.'))
  }, [loggedIn])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')

    try {
      if (isRegister) {
        await register(username, email, password)
        setMessage('Account created. You can now log in.')
        setIsRegister(false)
      } else {
        await login(username, password)
        setLoggedIn(true)
      }
    } catch {
      setMessage('Something went wrong.')
    }
  }

  async function handleCreateIssue(e: React.FormEvent) {
    e.preventDefault()

    try {
      const issue = await createIssue(
        newTitle,
        newDescription,
        newPriority,
        projects[0]?.id ?? 1
      )

      setIssues((current) => [...current, issue])
      setNewTitle('')
      setNewDescription('')
      setNewPriority('MEDIUM')
      setShowCreate(false)
    } catch {
      setMessage('Could not create issue.')
    }
  }

  async function handleDeleteIssue(id: number) {
    try {
      await deleteIssue(id)
      setIssues((current) => current.filter((issue) => issue.id !== id))
    } catch {
      setMessage('Could not delete issue.')
    }
  }

  async function moveIssue(issue: Issue, status: Issue['status']) {
    try {
      const updated = await updateIssue(issue.id, {
        title: issue.title,
        description: issue.description,
        status,
        priority: issue.priority,
      })

      setIssues((current) =>
        current.map((item) => (item.id === issue.id ? updated : item))
      )
    } catch {
      setMessage('Could not update issue.')
    }
  }

  if (!loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">DevFlow</h1>
            <p className="mt-2 text-gray-400">
              Project management platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {isRegister && (
              <input
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            <input
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-gray-950"
            >
              {isRegister ? 'Create account' : 'Login'}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-300">
              {message}
            </p>
          )}

          <button
            onClick={() => {
              setIsRegister(!isRegister)
              setMessage('')
            }}
            className="mt-6 w-full text-sm text-gray-400 hover:text-white"
          >
            {isRegister
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <h1 className="text-xl font-bold">DevFlow</h1>

        <button
          onClick={() => {
            localStorage.removeItem('token')
            setLoggedIn(false)
          }}
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800"
        >
          Logout
        </button>
      </header>

      <main className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Project Board</h2>
            {projects[0] && (
              <p className="mt-1 text-sm text-gray-400">
                Project: {projects[0].name}
              </p>
            )}
          </div>

          <button
            onClick={() => setShowCreate(!showCreate)}
            className="rounded-lg bg-white px-4 py-2 font-semibold text-gray-950"
          >
            + Create Issue
          </button>
        </div>

        {showCreate && (
          <form
            onSubmit={handleCreateIssue}
            className="mb-6 max-w-xl space-y-3 rounded-xl border border-gray-800 bg-gray-900 p-5"
          >
            <input
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none"
              placeholder="Issue title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <textarea
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none"
              placeholder="Description"
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>

            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2 font-semibold text-gray-950"
            >
              Create
            </button>
          </form>
        )}

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search issues..."
          className="mb-6 w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none"
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="mb-6 ml-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3"
        >
          <option value="ALL">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => (
            <section
              key={column.id}
              className="min-h-96 rounded-xl border border-gray-800 bg-gray-900 p-4"
            >
              <h3 className="mb-4 font-semibold">{column.title}</h3>

              <div className="space-y-3">
                {issues
                  .filter((issue) => issue.status === column.id)
                  .filter((issue) =>
                    issue.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .filter(
                    (issue) =>
                      priorityFilter === 'ALL' ||
                      issue.priority === priorityFilter
                  )
                  .map((issue) => (
                    <article
                      key={issue.id}
                      className="rounded-lg border border-gray-700 bg-gray-800 p-4"
                    >
                      <h4 className="font-medium">{issue.title}</h4>

                      {issue.description && (
                        <p className="mt-2 text-sm text-gray-400">
                          {issue.description}
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {issue.priority}
                        </span>

                        <button
                          onClick={() => handleDeleteIssue(issue.id)}
                          className="mr-2 text-xs text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>

                        <select
                          value={issue.status}
                          onChange={(e) =>
                            moveIssue(
                              issue,
                              e.target.value as Issue['status']
                            )
                          }
                          className="rounded border border-gray-700 bg-gray-900 px-2 py-1 text-xs"
                        >
                          {columns.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>

        {message && (
          <p className="mt-4 text-sm text-gray-400">{message}</p>
        )}
      </main>
    </div>
  )
}

export default App
