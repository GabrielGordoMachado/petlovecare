import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useAuth } from '../auth';

/*
 * Protege as rotas da área do tutor. Sem cliente logado, manda para o /login
 * guardando de onde veio, para voltar após entrar.
 */
export default function RotaProtegida({ children }: { children: ReactNode }) {
  const { cliente, carregando } = useAuth();
  const location = useLocation();

  if (carregando) return <p className="carregando">Carregando…</p>;

  if (!cliente) {
    // Abre o login por cima da Home (a rota protegida em si não renderiza sem
    // login — usá-la como fundo recairia neste mesmo redirect). `de` guarda o
    // destino pretendido para voltar após entrar.
    return (
      <Navigate
        to="/login"
        replace
        state={{ de: location.pathname, backgroundLocation: { pathname: '/' } }}
      />
    );
  }

  return <>{children}</>;
}
