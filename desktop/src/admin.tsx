import { createContext, useContext, useState, ReactNode } from 'react';

// Identificacao do administrador.
// Enquanto a API nao tiver rota de login (POST /auth/login), o CPF do admin
// fica guardado no localStorage e e usado nas acoes que exigem admin_cpf
// (aprovar agendamento, responder feedback, cadastrar servico).

interface AdminContextType {
  cpf: string;
  setCpf: (cpf: string) => void;
}

const AdminContext = createContext<AdminContextType>({ cpf: '', setCpf: () => {} });

export function AdminProvider({ children }: { children: ReactNode }) {
  const [cpf, setCpfState] = useState(() => localStorage.getItem('admin_cpf') || '');

  const setCpf = (valor: string) => {
    setCpfState(valor);
    localStorage.setItem('admin_cpf', valor);
  };

  return (
    <AdminContext.Provider value={{ cpf, setCpf }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
