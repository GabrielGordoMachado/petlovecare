import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async criar(data: {
    agendamento_id: number;
    cliente_cpf: string;
    nota: number;
    comentario: string;
  }) {
    return this.prisma.feedback.create({ data });
  }

  async listar() {
    return this.prisma.feedback.findMany({
      include: {
        cliente: { select: { nome: true, cpf: true } },
        administrador: { select: { nome: true, cpf: true } },
        agendamento: true,
      },
    });
  }

  async buscarPorId(id: number) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: {
        cliente: { select: { nome: true, cpf: true } },
        administrador: { select: { nome: true, cpf: true } },
      },
    });

    if (!feedback) throw new NotFoundException('Feedback nao encontrado.');
    return feedback;
  }

  async responder(id: number, admin_cpf: string, resposta: string) {
    await this.buscarPorId(id);
    return this.prisma.feedback.update({
      where: { id },
      data: { admin_cpf, resposta },
    });
  }

  async excluir(id: number) {
    await this.buscarPorId(id);
    return this.prisma.feedback.delete({ where: { id } });
  }
}
