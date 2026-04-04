import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../Context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function Feed() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects")
      setProjects(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-400">MzansiBuilds</h1>
        <div className="flex gap-4 items-center">
          <Link to="/create-project" className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold">
            + New Project
          </Link>
          <Link to="/wall" className="text-green-400 hover:text-green-300 text-sm">
            🎉 Wall
          </Link>
          <span className="text-gray-400 text-sm">@{user?.username}</span>
          <button onClick={handleLogout} className="text-red-400 text-sm hover:text-red-300">
            Logout
          </button>
        </div>
      </nav>

      {/* Feed */}
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-black mb-6">Live Feed 🔥</h2>

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet. Be the first to build in public!</p>
        ) : (
          projects.map(project => (
            <div key={project._id} className="bg-white border border-gray-200 rounded-xl p-6 mb-4 hover:border-green-400 transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-black">{project.title}</h3>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  {project.stage}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech_stack?.map((tech, i) => (
                  <span key={i} className="text-xs bg-black text-white px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  by @{project.developer_id?.username}
                </span>
                <Link to={`/project/${project._id}`}
                  className="text-green-600 text-sm font-semibold hover:underline">
                  View →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}