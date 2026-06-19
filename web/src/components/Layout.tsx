import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth';
import logo from '../assets/Logo2.svg';

/*
 * Cabeçalho + rodapé do site do cliente (mockups Desk1–4).
 * A navegação muda conforme o login: deslogado mostra "Entrar"; logado mostra
 * os atalhos da área do tutor e o botão de sair.
 */
export default function Layout() {
  const { cliente, sair } = useAuth();
  const navigate = useNavigate();

  function aoSair() {
    sair();
    navigate('/');
  }

  return (
    <div className="site">
      <header className="header">
        <div className="header-inner">
          <Link to="/">
            <img className="logo-img" src={logo} alt="PetLoveCare" />
          </Link>

          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'ativo' : '')}>
              Início
            </NavLink>
            {cliente && (
              <>
                <NavLink to="/pets" className={({ isActive }) => (isActive ? 'ativo' : '')}>
                  Meus pets
                </NavLink>
                <NavLink to="/agendar" className={({ isActive }) => (isActive ? 'ativo' : '')}>
                  Agendar
                </NavLink>
                <NavLink
                  to="/agendamentos"
                  className={({ isActive }) => (isActive ? 'ativo' : '')}
                >
                  Meus agendamentos
                </NavLink>
              </>
            )}
          </nav>

          <div className="header-acoes">
            {cliente ? (
              <>
                <Link to="/conta" className="conta-nome">
                  Olá, {cliente.nome.split(' ')[0]}
                </Link>
                <button className="btn-secundario" onClick={aoSair}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secundario">
                  Entrar
                </Link>
                <Link to="/agendar" className="btn-agende">
                  Agende
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="conteudo">
        <Outlet />
      </main>

      <footer className="rodape">
        <div className="rodape-inner">
          <span>PetLoveCare — cuidado em cada momento para o seu melhor amigo.</span>
          <span>APSOO · UFMS · 2026</span>
        </div>
      </footer>
    </div>
  );
}
