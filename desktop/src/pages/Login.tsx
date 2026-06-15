import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'

// Formata o CPF para exibicao: 000.000.000-00 (a API recebe so os digitos).
function formatarCpf(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [entrando, setEntrando] = useState(false)

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setErro('')
    setEntrando(true)
    try {
      await login(cpf, senha)
      navigate('/app', { replace: true })
    } catch (err: any) {
      setErro(err.message ?? 'Erro ao entrar.')
    } finally {
      setEntrando(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-glow" aria-hidden />
      <form className="login-card" onSubmit={entrar}>
        <div className="login-mark" aria-hidden>🐾</div>
        <h1 className="login-title">LOGIN</h1>

        <label className="campo">
          <span>CPF</span>
          <input
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
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        {erro && <p className="login-erro">{erro}</p>}

        <button className="btn-entrar" type="submit" disabled={entrando}>
          {entrando ? 'Entrando…' : 'Entrar'}
        </button>

        <button
          type="button"
          className="link-suave"
          onClick={() => setErro('Contate o administrador do sistema para redefinir a senha.')}
        >
          Esqueceu a senha?
        </button>
      </form>
    </div>
  )
}
