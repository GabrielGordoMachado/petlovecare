import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  criar(@Body() body: {
    cpf: string;
    nome: string;
    telefone: string;
    email: string;
    senha: string;
  }) {
    return this.administradoresService.criar(body);
  }

  @Get()
  listar() {
    return this.administradoresService.listar();
  }

  @Get(':cpf')
  buscar(@Param('cpf') cpf: string) {
    return this.administradoresService.buscarPorCpf(cpf);
  }

  @Put(':cpf')
  atualizar(@Param('cpf') cpf: string, @Body() body: {
    nome?: string;
    telefone?: string;
    email?: string;
    senha?: string;
  }) {
    return this.administradoresService.atualizar(cpf, body);
  }

  @Delete(':cpf')
  excluir(@Param('cpf') cpf: string) {
    return this.administradoresService.excluir(cpf);
  }
}
