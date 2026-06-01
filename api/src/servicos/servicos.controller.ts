import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicosService } from './servicos.service';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Post()
  criar(@Body() body: {
    admin_cpf: string;
    nome: string;
    descricao?: string;
    preco: number;
    duracao: number;
  }) {
    return this.servicosService.criar(body);
  }

  @Get()
  listar() {
    return this.servicosService.listar();
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.servicosService.buscarPorId(Number(id));
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() body: {
    nome?: string;
    descricao?: string;
    preco?: number;
    duracao?: number;
  }) {
    return this.servicosService.atualizar(Number(id), body);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.servicosService.excluir(Number(id));
  }
}
