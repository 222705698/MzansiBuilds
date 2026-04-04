import { useState } from "react"
import axios from "axios"
import { useAuth } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function CreateProject() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "", description: "", tech_stack: "", stage: "ideation", support_needed: ""
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/projects",
        { ...form, tech_stack: form.tech_stack.split(",").map(s => s.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate("/feed")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project")
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

      <div className="max-w-2xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-black mb-6">New Project 🚀</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <input name="title" placeholder="Project title" onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" required />

          <textarea name="description" placeholder="What are you building?" onChange={handleChange} rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" required />

          <input name="tech_stack" placeholder="Tech stack (e.g. React, Node.js, MongoDB)" onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" />

          <select name="stage" onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500">
            <option value="ideation">Ideation</option>
            <option value="planning">Planning</option>
            <option value="building">Building</option>
            <option value="testing">Testing</option>
            <option value="launched">Launched</option>
          </select>

          <input name="support_needed" placeholder="Support needed? (e.g. UI designer, backend dev)" onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" />

          <button type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
            Publish Project 
          </button>
        </form>
      </div>
    </div>
  )
}