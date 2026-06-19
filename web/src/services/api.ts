import axios from 'axios';
import type { Agendamento, Cliente, Feedback, Pet, Servico } from '../types';

/*
 * Cliente HTTP único da aplicação. A baseURL vem do .env (VITE_API_URL);
 * sem .env, cai na API de produção (Railway). Ver GUIA_INTEGRACAO.md.
 */
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'https://petlovecare-api-production.up.railway.app',
});

export default api;

// ---- Autenticação (provisória) -------------------------------------------
// A API ainda não tem POST /auth/login (ver GUIA_INTEGRACAO.md, seção 6).
// Estratégia: tentar a rota real; se ela não existir (404), cair na verificação
// provisória por CPF. Como o GET não devolve a senha, no modo provisório só
// confirmamos que o cliente existe. Quando o /auth/login for ao ar, o login
// passa a validar a senha de verdade sem mexer nas telas.
export const authService = {
  async loginCliente(cpf: string, senha: string): Promise<Cliente> {
    try {
      const { data } = await api.post('/auth/login', { cpf, senha, perfil: 'cliente' });
      return data.cliente ?? data;
    } catch (e) {
      // 401 = senha rejeitada pela rota já publicada → propaga o erro de verdade.
      if (axios.isAxiosError(e) && e.response?.status === 401) throw e;
      // Qualquer outra falha (404/400 = rota ainda não publicada no Railway)
      // → modo provisório: confirma o cliente pelo CPF.
      const { data } = await api.get<Cliente>(`/clientes/${cpf}`);
      return data;
    }
  },
};

// ---- Clientes ------------------------------------------------------------
export const clientesService = {
  cadastrar: (data: {
    cpf: string;
    nome: string;
    telefone: string;
    email: string;
    senha: string;
  }) => api.post<Cliente>('/clientes', data),
  buscar: (cpf: string) => api.get<Cliente & { pets: Pet[] }>(`/clientes/${cpf}`),
  atualizar: (cpf: string, data: Partial<{ nome: string; telefone: string; email: string; senha: string }>) =>
    api.put<Cliente>(`/clientes/${cpf}`, data),
};

// ---- Pets ----------------------------------------------------------------
export const petsService = {
  doCliente: (cpf: string) => api.get<Pet[]>(`/pets/cliente/${cpf}`),
  buscar: (id: number) => api.get<Pet>(`/pets/${id}`),
  criar: (data: {
    cliente_cpf: string;
    nomePet: string;
    especie: string;
    raca: string;
    idade: number;
    observacoes?: string;
  }) => api.post<Pet>('/pets', data),
  atualizar: (id: number, data: Partial<Omit<Pet, 'id' | 'cliente_cpf'>>) =>
    api.put<Pet>(`/pets/${id}`, data),
  excluir: (id: number) => api.delete(`/pets/${id}`),
};

// ---- Serviços (só leitura no app do cliente) -----------------------------
export const servicosService = {
  listar: () => api.get<Servico[]>('/servicos'),
};

// ---- Agendamentos --------------------------------------------------------
export const agendamentosService = {
  criar: (data: {
    cliente_cpf: string;
    pet_id: number;
    servico_ids: number[];
    data_hora: string;
    observacao?: string;
  }) => api.post<Agendamento>('/agendamentos', data),
  doCliente: (cpf: string) => api.get<Agendamento[]>(`/agendamentos/cliente/${cpf}`),
  cancelar: (id: number) => api.delete(`/agendamentos/${id}`),
};

// ---- Feedback ------------------------------------------------------------
export const feedbackService = {
  listar: () => api.get<Feedback[]>('/feedback'),
  criar: (data: {
    agendamento_id: number;
    cliente_cpf: string;
    nota: number;
    comentario: string;
  }) => api.post<Feedback>('/feedback', data),
};
