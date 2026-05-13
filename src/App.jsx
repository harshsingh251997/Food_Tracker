import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import AddEntryPage from './pages/AddEntryPage'
import AnalyticsPage from './pages/AnalyticsPage'
import Navbar from './components/Navbar'
import BackupPage from './pages/BackupPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen pb-[env(safe-area-inset-bottom)] text-white">
        <Navbar />

        <div className="animate-[pageFade_0.4s_ease]">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/add"
              element={<AddEntryPage />}
            />

            <Route
              path="/analytics"
              element={<AnalyticsPage />}
            />

            <Route
              path="/backup"
              element={<BackupPage />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App