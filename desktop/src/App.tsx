import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth'
import AppLayout from './AppLayout'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Agendamentos from './pages/Agendamentos'
import Servicos from './pages/Servicos'
import Feedbacks from './pages/Feedbacks'
import './App.css'

// HashRouter (e nao BrowserRouter) porque o Electron carrega de file:// em producao.

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/agendamentos" replace />} />
            <Route path="agendamentos" element={<Agendamentos />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="feedbacks" element={<Feedbacks />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
