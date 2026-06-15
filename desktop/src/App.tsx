import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { AdminProvider, useAdmin } from './admin'
import Agendamentos from './pages/Agendamentos'
import Servicos from './pages/Servicos'
import Feedbacks from './pages/Feedbacks'
import './App.css'

// HashRouter (e nao BrowserRouter) porque o Electron carrega de file:// em producao.

function Header() {
  const { cpf, setCpf } = useAdmin()
  return (
    <header className="topbar">
      <span className="brand">🐾 PetLoveCare · Admin</span>
      <label className="admin-id">
        CPF do admin:
        <input
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="00000000000"
          maxLength={11}
        />
      </label>
    </header>
  )
}

function App() {
  return (
    <AdminProvider>
      <HashRouter>
        <Header />
        <div className="layout">
          <nav className="sidebar">
            <NavLink to="/agendamentos">Agendamentos</NavLink>
            <NavLink to="/servicos">Serviços</NavLink>
            <NavLink to="/feedbacks">Feedbacks</NavLink>
          </nav>
          <main className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/agendamentos" replace />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AdminProvider>
  )
}

export default App
