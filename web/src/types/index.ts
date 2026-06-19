/*
 * Tipos do domínio, espelhando o contrato da API (ver GUIA_INTEGRACAO.md).
 * As chaves seguem exatamente o JSON que a API devolve (snake_case onde for o caso).
 */

export interface Cliente {
  cpf: string;
  nome: string;
  telefone: string;
  email: string;
}

export interface Pet {
  id: number;
  cliente_cpf: string;
  nomePet: string;
  especie: string;
  raca: string;
  idade: number;
  observacoes?: string;
}

export interface Servico {
  id: number;
  admin_cpf: string;
  nome: string;
  descricao?: string;
  preco: number;
  duracao: number; // minutos
}

export type StatusAgendamento =
  | 'agendado'
  | 'em_andamento'
  | 'finalizado'
  | 'cancelado';

export interface Agendamento {
  id: number;
  cliente_cpf: string;
  pet_id: number;
  admin_cpf?: string;
  data_hora: string; // ISO
  status: StatusAgendamento;
  observacao?: string;
  // Vêm preenchidos quando a API inclui os relacionamentos (GET):
  pet?: Pet;
  agendamentoServico?: { servico: Servico }[];
  feedback?: Feedback | null;
}

export interface Feedback {
  id: number;
  agendamento_id: number;
  cliente_cpf: string;
  admin_cpf?: string;
  nota: number; // 1 a 5
  comentario: string;
  resposta?: string;
  data: string; // ISO
}
