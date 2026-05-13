import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddEntryPage from './pages/AddEntryPage'
import AnalyticsPage from './pages/AnalyticsPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f1115] text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddEntryPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App