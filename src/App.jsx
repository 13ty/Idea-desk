import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import IdeaGeneratorPage from './pages/IdeaGeneratorPage'
import ProjectCustomizer from './pages/ProjectCustomizer'
import InteractiveSegmentPage from './pages/InteractiveSegmentPage'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<IdeaGeneratorPage />} />
        <Route path="/customize" element={<ProjectCustomizer />} />
        <Route path="/interactive-segments" element={<InteractiveSegmentPage />} />
      </Routes>
    </div>
  )
}

export default App
