import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../Context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"

export default function ProjectDetail() {
  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [milestones, setMilestones] = useState([])
  const [comments, setComments] = useState([])
  const [milestoneForm, setMilestoneForm] = useState({ title: "", description: "" })
  const [commentBody, setCommentBody] = useState("")

  useEffect(() => {
    fetchProject()
    fetchMilestones()
    fetchComments()
  }, [])

  const fetchProject = async () => {
    const res = await axios.get(`http://localhost:5000/api/projects/${id}`)
    setProject(res.data)
  }

  const fetchMilestones = async () => {
    const res = await axios.get(`http://localhost:5000/api/milestones/${id}`)
    setMilestones(res.data)
  }

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:5000/api/comments/${id}`)
    setComments(res.data)
  }

  const addMilestone = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:5000/api/milestones/${id}`, milestoneForm,
      { headers: { Authorization: `Bearer ${token}` } })
    setMilestoneForm({ title: "", description: "" })
    fetchMilestones()
  }

  const addComment = async (type) => {
    await axios.post(`http://localhost:5000/api/comments/${id}`,
      { body: commentBody, type },
      { headers: { Authorization: `Bearer ${token}` } })
    setCommentBody("")
    fetchComments()
  }

  const markComplete = async () => {
    await axios.patch(`http://localhost:5000/api/projects/${id}/complete`, {},
      { headers: { Authorization: `Bearer ${token}` } })
    navigate("/wall")
  }

  if (!project) return <p className="p-8">Loading...</p>

  const isOwner = user?.id === project.developer_id?._id

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-400">MzansiBuilds</h1>
        <button onClick={() => navigate("/feed")} className="text-gray-400 hover:text-white text-sm">
          ← Back to Feed
        </button>
      </nav>

      <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Project Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-black">{project.title}</h2>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              {project.stage}
            </span>
          </div>
          <p className="text-gray-600 mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech_stack?.map((tech, i) => (
              <span key={i} className="text-xs bg-black text-white px-2 py-1 rounded-full">{tech}</span>
            ))}
          </div>
          {project.support_needed && (
            <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
              🙋 Support needed: {project.support_needed}
            </p>
          )}
          {isOwner && !project.is_completed && (
            <button onClick={markComplete}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
               Mark as Complete
            </button>
          )}
        </div>

        {/* Milestones */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-black mb-4">Milestones 🏆</h3>
          {milestones.length === 0 && <p className="text-gray-400 text-sm">No milestones yet.</p>}
          {milestones.map(m => (
            <div key={m._id} className="border-l-4 border-green-500 pl-4 mb-3">
              <p className="font-semibold text-black">{m.title}</p>
              <p className="text-gray-500 text-sm">{m.description}</p>
            </div>
          ))}

          {isOwner && (
            <form onSubmit={addMilestone} className="mt-4 space-y-2">
              <input placeholder="Milestone title"
                value={milestoneForm.title}
                onChange={e => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" required />
              <input placeholder="Description"
                value={milestoneForm.description}
                onChange={e => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" />
              <button type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                + Add Milestone
              </button>
            </form>
          )}
        </div>

        {/* Comments */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-black mb-4">Comments & Collaboration 💬</h3>
          {comments.length === 0 && <p className="text-gray-400 text-sm">No comments yet.</p>}
          {comments.map(c => (
            <div key={c._id} className="border-b border-gray-100 py-3">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-green-600">@{c.author_id?.username}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${c.type === "raise_hand" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                  {c.type === "raise_hand" ? "🙋 Raise Hand" : "💬 Comment"}
                </span>
              </div>
              <p className="text-gray-700 text-sm mt-1">{c.body}</p>
            </div>
          ))}

          <div className="mt-4 space-y-2">
            <textarea placeholder="Write a comment or raise your hand..."
              value={commentBody}
              onChange={e => setCommentBody(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" rows={3} />
            <div className="flex gap-2">
              <button onClick={() => addComment("comment")}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
                 Comment
              </button>
              <button onClick={() => addComment("raise_hand")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600">
                🙋 Raise Hand
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}