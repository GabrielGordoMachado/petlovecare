import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdministradoresService {
  constructor(private prisma: PrismaService) {}

  async criar(data: {
    cpf: string;
    nome: string;
    telefone: string;
    email: string;
    senha: string;
  }) {
    const existe = await this.prisma.administrador.findFirst({
      where: { OR: [{ cpf: data.cpf }, { email: data.email }] },
    });

    if (existe) throw new ConflictException('CPF ou e-mail ja cadastrado.');

    return this.prisma.administrador.create({ data });
  }

  async listar() {
    return this.prisma.administrador.findMany({
      select: { cpf: true, nome: true, telefone: true, email: true },
    });
  }

  async buscarPorCpf(cpf: string) {
    const admin = await this.prisma.administrador.findUnique({
      where: { cpf },
      select: { cpf: true, nome: true, telefone: true, email: true },
    });

    if (!admin) throw new NotFoundException('Administrador nao encontrado.');
    return admin;
  }

  async atualizar(cpf: string, data: {
    nome?: string;
    telefone?: string;
    email?: string;
    senha?: string;
  }) {
    await this.buscarPorCpf(cpf);
    return this.prisma.administrador.update({ where: { cpf }, data });
  }

  async excluir(cpf: string) {
    await this.buscarPorCpf(cpf);
    return this.prisma.administrador.delete({ where: { cpf } });
  }
}
