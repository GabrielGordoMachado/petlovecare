import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { authService } from './services/api';
import { apenasDigitos } from './utils/cpf';
import type { Cliente } from './types';

/*
 * Sessão do cliente (tutor) logado.
 * Persistida em localStorage para sobreviver a um F5. A verificação de senha
 * é provisória enquanto a API não tem POST /auth/login (ver services/api.ts).
 */

interface AuthContextType {
  cliente: Cliente | null;
  carregando: boolean;
  entrar: (cpf: string, senha: string) => Promise<void>;
  registrarSessao: (cliente: Cliente) => void;
  sair: () => void;
}

const AuthContext = createContext<AuthContextType>({
  cliente: null,
  carregando: true,
  entrar: async () => {},
  registrarSessao: () => {},
  sair: () => {},
});

const CHAVE = 'petlove_cliente';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Recupera a sessão salva ao abrir o app.
  useEffect(() => {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) {
      try {
        setCliente(JSON.parse(bruto) as Cliente);
      } catch {
        localStorage.removeItem(CHAVE);
      }
    }
    setCarregando(false);
  }, []);

  function registrarSessao(c: Cliente) {
    setCliente(c);
    localStorage.setItem(CHAVE, JSON.stringify(c));
  }

  async function entrar(cpfDigitado: string, senha: string) {
    const cpf = apenasDigitos(cpfDigitado);
    if (cpf.length !== 11) throw new Error('CPF deve ter 11 dígitos.');
    if (!senha) throw new Error('Informe a senha.');

    try {
      const dados = await authService.loginCliente(cpf, senha);
      registrarSessao({
        cpf: dados.cpf,
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
      });
    } catch (e: unknown) {
      // Tipamos o erro do axios sem depender do import aqui.
      const status = (e as { response?: { status?: number } })?.response?.status;
      if (status === 404) throw new Error('CPF não encontrado. Verifique ou cadastre-se.');
      if (status === 401) throw new Error('Senha inválida.');
      throw new Error('Não foi possível entrar. Verifique a conexão com a API.');
    }
  }

  function sair() {
    localStorage.removeItem(CHAVE);
    setCliente(null);
  }

  return (
    <AuthContext.Provider
      value={{ cliente, carregando, entrar, registrarSessao, sair }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
