import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./Context/AuthContext"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Feed from "./Pages/Feed"
import CreateProject from "./Pages/CreateProject"
import ProjectDetail from "./Pages/ProjectDetail"
import CelebrationWall from "./Pages/CelebrationWall"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/wall" element={<CelebrationWall />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App