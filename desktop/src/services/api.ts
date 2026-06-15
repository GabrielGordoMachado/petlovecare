import axios from 'axios';

// baseURL vem do .env (VITE_API_URL). Sem .env, usa a API de producao (Railway).
// Para testar contra a API local, crie desktop/.env com:
//   VITE_API_URL=http://localhost:3000
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://petlovecare-api-production.up.railway.app',
});

export default api;

// Autenticação (provisória)
// A API ainda não tem POST /auth/login. Enquanto isso, o login do admin é feito
// buscando o administrador por CPF. Obs.: GET /administradores/:cpf NÃO retorna a
// senha (a API a oculta), então a verificação real de senha depende da rota
// POST /auth/login (TODO do Gabriel — ver GUIA_INTEGRACAO.md, seção 6).
export const authService = {
  loginAdmin: (cpf: string) => api.get(`/administradores/${cpf}`),
};

// Administradores
export const administradoresService = {
  buscar: (cpf: string) => api.get(`/administradores/${cpf}`),
  listar: () => api.get('/administradores'),
  criar: (data: any) => api.post('/administradores', data),
  atualizar: (cpf: string, data: any) => api.put(`/administradores/${cpf}`, data),
  excluir: (cpf: string) => api.delete(`/administradores/${cpf}`),
};

// Clientes
export const clientesService = {
  listar: () => api.get('/clientes'),
  buscar: (cpf: string) => api.get(`/clientes/${cpf}`),
  excluir: (cpf: string) => api.delete(`/clientes/${cpf}`),
};

// Pets
export const petsService = {
  listar: () => api.get('/pets'),
  buscar: (id: number) => api.get(`/pets/${id}`),
  listarPorCliente: (cpf: string) => api.get(`/pets/cliente/${cpf}`),
};

// Serviços
export const servicosService = {
  listar: () => api.get('/servicos'),
  criar: (data: any) => api.post('/servicos', data),
  atualizar: (id: number, data: any) => api.put(`/servicos/${id}`, data),
  excluir: (id: number) => api.delete(`/servicos/${id}`),
};

// Agendamentos
export const agendamentosService = {
  listar: () => api.get('/agendamentos'),
  buscar: (id: number) => api.get(`/agendamentos/${id}`),
  atualizarStatus: (id: number, status: string, admin_cpf: string) =>
    api.put(`/agendamentos/${id}/status`, { status, admin_cpf }),
};

// Feedback
export const feedbackService = {
  listar: () => api.get('/feedback'),
  responder: (id: number, admin_cpf: string, resposta: string) =>
    api.put(`/feedback/${id}/responder`, { admin_cpf, resposta }),
};
