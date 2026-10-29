import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SkillUIUX from './pages/skills/SkillUIUX'
import SkillWeb from './pages/skills/SkillWeb'
import SkillGame from './pages/skills/SkillGame'
import SkillArt from './pages/skills/SkillArt'
import ProjectSomnus from './pages/projects/ProjectSomnus'
import ProjectDailyMood from './pages/projects/ProjectDailyMood'
import ProjectLecVenture from './pages/projects/ProjectLecVenture'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Individual skill pages */}
        <Route path="/skills/uiux"  element={<SkillUIUX />} />
        <Route path="/skills/web"   element={<SkillWeb />} />
        <Route path="/skills/game"  element={<SkillGame />} />
        <Route path="/skills/art"   element={<SkillArt />} />
        {/* Individual project pages */}
        <Route path="/projects/somnus"     element={<ProjectSomnus />} />
        <Route path="/projects/dailymood"  element={<ProjectDailyMood />} />
        <Route path="/projects/lecventure" element={<ProjectLecVenture />} />
      </Routes>
    </BrowserRouter>
  )
}
