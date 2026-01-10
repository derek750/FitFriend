import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from "./pages/loginpage"
import HomePage from "./pages/homepage"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
