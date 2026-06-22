import { useEffect, useState, type MouseEvent } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../auth';
import { useModalAuthAberto } from '../App';
import logo from '../assets/Logo2.svg';

/* Seções da landing, na ordem em que aparecem na Home. */
const SECOES = ['inicio', 'servicos', 'sobre', 'contato'] as const;

/*
 * Cabeçalho + rodapé do site do cliente (mockups Desk1–4).
 * A navegação muda conforme o login: deslogado mostra "Entrar"; logado mostra
 * os atalhos da área do tutor e o botão de sair.
 */
export default function Layout() {
  const { cliente, sair } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const modalAuthAberto = useModalAuthAberto();

  // Com o popup de login/cadastro aberto, a navbar continua visível atrás do
  // scrim. Clicar nos botões que (re)abrem autenticação não deve navegar de
  // novo — senão a tela "pisca". Deixa clicar, mas não executa.
  function semReabrirAuth(e: MouseEvent) {
    if (modalAuthAberto) e.preventDefault();
  }

  // Âncoras (#secao) fazem navegação nativa de hash, que descarta o state do
  // React Router (inclusive o backgroundLocation) e colapsaria o popup de login
  // para tela cheia. Interceptamos e rolamos manualmente: a URL/estado ficam
  // intactos (o fundo continua rodando atrás do scrim).
  function irParaSecao(e: MouseEvent, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
  const [secaoAtiva, setSecaoAtiva] = useState<string>('inicio');

  function aoSair() {
    sair();
    navigate('/');
  }

  /* Scrollspy da landing: marca o link da seção visível (faixa amarela). */
  useEffect(() => {
    if (cliente) return; // só na navegação por âncoras (deslogado)
    const alvos = SECOES
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (alvos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visivel = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setSecaoAtiva(visivel.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    alvos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [cliente]);

  return (
    <div className="site">
      <header className="header">
        <div className="header-inner">
          <Link to="/">
            <img className="logo-img" src={logo} alt="PetLoveCare" />
          </Link>

          <nav className="nav">
            {cliente ? (
              <>
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'ativo' : '')}>
                  Início
                </NavLink>
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
            ) : (
              <>
                <a
                  href="#inicio"
                  className={secaoAtiva === 'inicio' ? 'ativo' : ''}
                  onClick={(e) => irParaSecao(e, 'inicio')}
                >
                  Início
                </a>
                <a
                  href="#servicos"
                  className={secaoAtiva === 'servicos' ? 'ativo' : ''}
                  onClick={(e) => irParaSecao(e, 'servicos')}
                >
                  Serviços
                </a>
                <a
                  href="#sobre"
                  className={secaoAtiva === 'sobre' ? 'ativo' : ''}
                  onClick={(e) => irParaSecao(e, 'sobre')}
                >
                  Sobre nós
                </a>
                <a
                  href="#contato"
                  className={secaoAtiva === 'contato' ? 'ativo' : ''}
                  onClick={(e) => irParaSecao(e, 'contato')}
                >
                  Contato
                </a>
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
                <Link
                  to="/login"
                  state={{ backgroundLocation: location, de: location.pathname }}
                  className="btn-secundario"
                  onClick={semReabrirAuth}
                >
                  Entrar
                </Link>
                <Link to="/agendar" className="btn-agende" onClick={semReabrirAuth}>
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
