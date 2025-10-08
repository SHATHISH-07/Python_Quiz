import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Leaderboard from "./components/LeaderBoard"
import Register from "./components/Register"
import Quiz from "./components/Quiz"
import { Routes, Route } from "react-router-dom"
import Result from "./components/Result"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  )
}

export default App