import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicosService {
  constructor(private prisma: PrismaService) {}

  async criar(data: {
    admin_cpf: string;
    nome: string;
    descricao?: string;
    preco: number;
    duracao: number;
  }) {
    return this.prisma.servico.create({ data });
  }

  async listar() {
    return this.prisma.servico.findMany({
      include: { administrador: { select: { nome: true, cpf: true } } },
    });
  }

  async buscarPorId(id: number) {
    const servico = await this.prisma.servico.findUnique({
      where: { id },
      include: { administrador: { select: { nome: true, cpf: true } } },
    });

    if (!servico) throw new NotFoundException('Servico nao encontrado.');
    return servico;
  }

  async atualizar(id: number, data: {
    nome?: string;
    descricao?: string;
    preco?: number;
    duracao?: number;
  }) {
    await this.buscarPorId(id);
    return this.prisma.servico.update({ where: { id }, data });
  }

  async excluir(id: number) {
    await this.buscarPorId(id);
    return this.prisma.servico.delete({ where: { id } });
  }
}
