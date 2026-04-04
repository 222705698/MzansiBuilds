import { useState } from "react"
import axios from "axios"
import { useAuth } from "../Context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form)
      login(res.data.user, res.data.token)
      navigate("/feed")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-green-600 mb-2">MzansiBuilds</h2>
        <p className="text-gray-500 mb-6">Welcome back 👋</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" required />

          <button type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          No account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  )
}