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
    return <Navigate to="/login" replace state={{ de: location.pathname }} />;
  }

  return <>{children}</>;
}
