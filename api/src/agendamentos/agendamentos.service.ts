import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgendamentosService {
  constructor(private prisma: PrismaService) {}

  async criar(data: {
    cliente_cpf: string;
    pet_id: number;
    servico_ids: number[];
    data_hora: string;
    observacao?: string;
  }) {
    // RN01 — maximo 2 servicos por agendamento
    if (data.servico_ids.length === 0 || data.servico_ids.length > 2) {
      throw new BadRequestException('O agendamento deve ter entre 1 e 2 servicos (RN01).');
    }

    // RN03 — nao agendar com menos de 1 hora antes do fechamento (18h)
    const dataHora = new Date(data.data_hora);
    const fechamento = new Date(dataHora);
    fechamento.setHours(18, 0, 0, 0);
    const diferencaMs = fechamento.getTime() - dataHora.getTime();
    const diferencaHoras = diferencaMs / (1000 * 60 * 60);

    if (diferencaHoras < 1) {
      throw new BadRequestException('Nao e possivel agendar com menos de 1 hora antes do fechamento (RN03).');
    }

    // RN02 — caes acima de 20kg exigem verificacao (validacao por observacao por ora)
    const pet = await this.prisma.pet.findUnique({ where: { id: data.pet_id } });
    if (!pet) throw new NotFoundException('Pet nao encontrado.');

    const temBanhoOuTosa = await this.prisma.servico.findFirst({
      where: {
        id: { in: data.servico_ids },
        nome: { in: ['Banho', 'Tosa', 'Banho e Tosa'] },
      },
    });

    if (temBanhoOuTosa && pet.observacoes?.toLowerCase().includes('acima de 20kg')) {
      if (data.servico_ids.length < 2) {
        throw new BadRequestException('Caes acima de 20kg exigem dois horarios seguidos (RN02).');
      }
    }

    // Cria o agendamento
    return this.prisma.agendamento.create({
      data: {
        cliente_cpf: data.cliente_cpf,
        pet_id: data.pet_id,
        data_hora: new Date(data.data_hora),
        observacao: data.observacao,
        agendamentoServico: {
          create: data.servico_ids.map(id => ({ servico_id: id })),
        },
      },
      include: { agendamentoServico: true, pet: true },
    });
  }

  async listar() {
    return this.prisma.agendamento.findMany({
      include: {
        cliente: { select: { nome: true, cpf: true } },
        pet: true,
        agendamentoServico: { include: { servico: true } },
      },
    });
  }

  async listarPorCliente(cliente_cpf: string) {
    return this.prisma.agendamento.findMany({
      where: { cliente_cpf },
      include: {
        pet: true,
        agendamentoServico: { include: { servico: true } },
      },
    });
  }

  async buscarPorId(id: number) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
      include: {
        cliente: { select: { nome: true, cpf: true } },
        pet: true,
        agendamentoServico: { include: { servico: true } },
      },
    });

    if (!agendamento) throw new NotFoundException('Agendamento nao encontrado.');
    return agendamento;
  }

  async atualizarStatus(id: number, status: string, admin_cpf?: string) {
    await this.buscarPorId(id);
    return this.prisma.agendamento.update({
      where: { id },
      data: { status: status as any, admin_cpf },
    });
  }

  async cancelar(id: number) {
    return this.atualizarStatus(id, 'cancelado');
  }
}
