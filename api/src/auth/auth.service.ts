import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // Valida CPF + senha de um cliente ou administrador.
  // TODO de segurança: as senhas hoje são texto puro. O ideal é guardar um hash
  // (ex.: bcrypt) na criação e comparar com bcrypt.compare aqui.
  async login(cpf: string, senha: string, tipo: 'cliente' | 'administrador' = 'cliente') {
    const registro =
      tipo === 'administrador'
        ? await this.prisma.administrador.findUnique({ where: { cpf } })
        : await this.prisma.cliente.findUnique({ where: { cpf } });

    // Mensagem genérica de propósito: não revela se foi o CPF ou a senha que errou.
    if (!registro || registro.senha !== senha) {
      throw new UnauthorizedException('CPF ou senha inválidos.');
    }

    return {
      cpf: registro.cpf,
      nome: registro.nome,
      email: registro.email,
      tipo,
    };
  }
}
