import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  criar(@Body() body: {
    cpf: string;
    nome: string;
    telefone: string;
    email: string;
    senha: string;
  }) {
    return this.clientesService.criar(body);
  }

  @Get()
  listar() {
    return this.clientesService.listar();
  }

  @Get(':cpf')
  buscar(@Param('cpf') cpf: string) {
    return this.clientesService.buscarPorCpf(cpf);
  }

  @Put(':cpf')
  atualizar(@Param('cpf') cpf: string, @Body() body: {
    nome?: string;
    telefone?: string;
    email?: string;
    senha?: string;
  }) {
    return this.clientesService.atualizar(cpf, body);
  }

  @Delete(':cpf')
  excluir(@Param('cpf') cpf: string) {
    return this.clientesService.excluir(cpf);
  }
}

