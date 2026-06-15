import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petlovecare-api-production.up.railway.app',
});

export default api;

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
