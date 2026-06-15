export interface Administrador {
  cpf: string;
  nome: string;
  telefone: string;
  email: string;
}

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
  duracao: number;
}

export interface Agendamento {
  id: number;
  cliente_cpf: string;
  pet_id: number;
  admin_cpf?: string;
  data_hora: string;
  status: 'agendado' | 'em_andamento' | 'finalizado' | 'cancelado';
  observacao?: string;
}

export interface Feedback {
  id: number;
  agendamento_id: number;
  cliente_cpf: string;
  admin_cpf?: string;
  nota: number;
  comentario: string;
  resposta?: string;
  data: string;
}
