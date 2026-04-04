import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function CelebrationWall() {
  const navigate = useNavigate()
  const [wall, setWall] = useState([])

  useEffect(() => {
    fetchWall()
  }, [])

  const fetchWall = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wall")
      setWall(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-400">MzansiBuilds</h1>
        <button onClick={() => navigate("/feed")} className="text-gray-400 hover:text-white text-sm">
          ← Back to Feed
        </button>
      </nav>

      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-black mb-2">🎉 Celebration Wall</h2>
        <p className="text-gray-500 mb-8">Developers who built in public and shipped!</p>

        {wall.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-4xl mb-4">🏗️</p>
            <p className="text-gray-500">No completed projects yet.</p>
            <p className="text-gray-400 text-sm">Be the first to ship!</p>
          </div>
        ) : (
          wall.map(entry => (
            <div key={entry._id} className="bg-white border border-green-200 rounded-xl p-6 mb-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {entry.developer_id?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-black">@{entry.developer_id?.username}</p>
                  <p className="text-gray-400 text-sm">{entry.developer_id?.bio}</p>
                </div>
                <span className="ml-auto text-2xl">🏆</span>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-green-800">{entry.project_id?.title}</h3>
                <p className="text-green-700 text-sm mt-1">{entry.project_id?.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {entry.project_id?.tech_stack?.map((tech, i) => (
                    <span key={i} className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-3">
                 Completed on {new Date(entry.celebrated_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}