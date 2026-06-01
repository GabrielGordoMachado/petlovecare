import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async criar(data: {
    cliente_cpf: string;
    nomePet: string;
    especie: string;
    raca: string;
    idade: number;
    observacoes?: string;
  }) {
    return this.prisma.pet.create({ data });
  }

  async listar() {
    return this.prisma.pet.findMany({
      include: { cliente: { select: { nome: true, cpf: true } } },
    });
  }

  async listarPorCliente(cliente_cpf: string) {
    return this.prisma.pet.findMany({
      where: { cliente_cpf },
    });
  }

  async buscarPorId(id: number) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: { cliente: { select: { nome: true, cpf: true } } },
    });

    if (!pet) throw new NotFoundException('Pet nao encontrado.');
    return pet;
  }

  async atualizar(id: number, data: {
    nomePet?: string;
    especie?: string;
    raca?: string;
    idade?: number;
    observacoes?: string;
  }) {
    await this.buscarPorId(id);
    return this.prisma.pet.update({ where: { id }, data });
  }

  async excluir(id: number) {
    await this.buscarPorId(id);
    return this.prisma.pet.delete({ where: { id } });
  }
}
