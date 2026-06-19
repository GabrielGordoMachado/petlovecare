import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../auth';
import { formatarCpf } from '../utils/cpf';
import marca from '../assets/Logo2.svg';

/*
 * Tela de Login do cliente (mockup PopUp1).
 * Atende RF01 (autenticação). Após entrar, volta para a página de origem
 * (se veio de uma rota protegida) ou para o início.
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { entrar } = useAuth();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [entrando, setEntrando] = useState(false);

  const destino = (location.state as { de?: string } | null)?.de ?? '/';

  async function aoEnviar(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setEntrando(true);
    try {
      await entrar(cpf, senha);
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao entrar.');
    } finally {
      setEntrando(false);
    }
  }

  return (
    <div className="popup">
      <form className="popup-card" onSubmit={aoEnviar}>
        <img className="popup-marca-img" src={marca} alt="PetLoveCare" />
        <h1 className="popup-titulo">Login</h1>

        <label className="campo">
          <span>CPF</span>
          <input
            className="input"
            value={cpf}
            onChange={(e) => setCpf(formatarCpf(e.target.value))}
            placeholder="000.000.000-00"
            inputMode="numeric"
            autoFocus
          />
        </label>

        <label className="campo">
          <span>Senha</span>
          <input
            className="input"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        {erro && <p className="popup-erro">{erro}</p>}

        <button className="btn-coral" type="submit" disabled={entrando}>
          {entrando ? 'Entrando…' : 'Entrar'}
        </button>

        <Link to="/cadastro" className="link-suave" style={{ textAlign: 'center' }}>
          Não tem uma conta? Cadastre-se
        </Link>
        <button
          type="button"
          className="link-suave"
          onClick={() =>
            setErro('Para redefinir a senha, entre em contato com a loja.')
          }
        >
          Esqueceu a senha?
        </button>

        <Link to="/" className="link-suave" style={{ textAlign: 'center' }}>
          ← Voltar ao site
        </Link>
      </form>
    </div>
  );
}
