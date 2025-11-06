import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SoilAnalysisPage from './pages/SoilAnalysisPage'
import AnalyticsPage from './pages/AnalyticsPage'
import MethodologyPage from './pages/MethodologyPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<SoilAnalysisPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/methodology" element={<MethodologyPage />} />
      </Routes>
    </Router>
  )
}

export default App