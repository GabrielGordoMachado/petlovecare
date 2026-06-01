import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  // Criar cliente
  async criar(data: {
    cpf: string;
    nome: string;
    telefone: string;
    email: string;
    senha: string;
  }) {
    // Verifica se CPF ou email já existem
    const existe = await this.prisma.cliente.findFirst({
      where: { OR: [{ cpf: data.cpf }, { email: data.email }] },
    });

    if (existe) {
      throw new ConflictException('CPF ou e-mail já cadastrado.');
    }

    return this.prisma.cliente.create({ data });
  }

  // Listar todos
  async listar() {
    return this.prisma.cliente.findMany({
      select: {
        cpf: true,
        nome: true,
        telefone: true,
        email: true,
        // senha nunca é retornada
      },
    });
  }

  // Buscar por CPF
  async buscarPorCpf(cpf: string) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { cpf },
      select: {
        cpf: true,
        nome: true,
        telefone: true,
        email: true,
        pets: true,
      },
    });

    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    return cliente;
  }

  // Atualizar
  async atualizar(cpf: string, data: {
    nome?: string;
    telefone?: string;
    email?: string;
    senha?: string;
  }) {
    await this.buscarPorCpf(cpf); // valida se existe
    return this.prisma.cliente.update({ where: { cpf }, data });
  }

  // Excluir
  async excluir(cpf: string) {
    await this.buscarPorCpf(cpf); // valida se existe
    return this.prisma.cliente.delete({ where: { cpf } });
  }
}
