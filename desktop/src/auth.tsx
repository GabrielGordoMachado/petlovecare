import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService } from './services/api'

// Sessão do administrador logado.
// Persistida via electron-store (window.store, gravado em disco pelo main process).
// Fora do Electron (navegador), cai para localStorage para permitir testes da UI.

export interface Admin {
  cpf: string
  nome: string
}

interface AuthContextType {
  admin: Admin | null
  carregando: boolean
  login: (cpf: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  admin: null,
  carregando: true,
  login: async () => {},
  logout: () => {},
})

const CHAVE = 'admin'

async function carregarSessao(): Promise<Admin | null> {
  if (window.store) return (await window.store.get<Admin>(CHAVE)) ?? null
  const bruto = localStorage.getItem(CHAVE)
  return bruto ? (JSON.parse(bruto) as Admin) : null
}

async function salvarSessao(admin: Admin) {
  if (window.store) {
    console.log('[auth] persistindo sessao via electron-store (disco)')
    await window.store.set(CHAVE, admin)
  } else {
    console.log('[auth] window.store ausente -> usando localStorage (fallback)')
    localStorage.setItem(CHAVE, JSON.stringify(admin))
  }
}

async function limparSessao() {
  if (window.store) await window.store.delete(CHAVE)
  else localStorage.removeItem(CHAVE)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarSessao()
      .then(setAdmin)
      .finally(() => setCarregando(false))
  }, [])

  async function login(cpfDigitado: string, senha: string) {
    const cpf = cpfDigitado.replace(/\D/g, '') // envia só os 11 dígitos
    if (cpf.length !== 11) throw new Error('CPF deve ter 11 dígitos.')
    if (!senha) throw new Error('Informe a senha.')

    // Login real: valida CPF + senha via POST /auth/login (tipo administrador).
    // A API usa mensagem genérica (não revela se errou o CPF ou a senha).
    let logado: Admin
    try {
      const { data } = await authService.loginAdmin(cpf, senha)
      logado = { cpf: data.cpf, nome: data.nome }
    } catch (e: any) {
      if (e?.response?.status === 401) throw new Error('CPF ou senha inválidos.')
      throw new Error('Não foi possível entrar. Verifique a conexão com a API.')
    }

    setAdmin(logado)
    // A persistência não deve bloquear o login: se falhar, logamos mas seguimos.
    try {
      await salvarSessao(logado)
    } catch (e) {
      console.error('[auth] falha ao persistir a sessão:', e)
    }
  }

  function logout() {
    limparSessao()
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
