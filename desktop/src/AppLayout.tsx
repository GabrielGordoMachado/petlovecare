import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import logo from './assets/Logo1.svg'

export default function AppLayout() {
  const { admin, carregando, logout } = useAuth()
  const navigate = useNavigate()

  if (carregando) return <div className="carregando-tela">Carregando…</div>
  if (!admin) return <Navigate to="/login" replace />

  function sair() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="shell">
      <aside className="shell-sidebar">
        <img className="shell-logo" src={logo} alt="PetLove Care" />
        <nav className="shell-nav">
          <NavLink to="/app/agendamentos">
            <span className="ico">📅</span> Agendamentos
          </NavLink>
          <NavLink to="/app/servicos">
            <span className="ico">✂️</span> Serviços
          </NavLink>
          <NavLink to="/app/feedbacks">
            <span className="ico">💬</span> Feedbacks
          </NavLink>
        </nav>
        <div className="shell-user">
          <div className="shell-avatar">{admin.nome.charAt(0).toUpperCase()}</div>
          <div className="shell-user-info">
            <strong>{admin.nome}</strong>
            <small>Administrador</small>
          </div>
          <button className="shell-sair" onClick={sair} title="Sair">
            ⏻
          </button>
        </div>
      </aside>
      <main className="shell-content">
        <Outlet />
      </main>
    </div>
  )
}
