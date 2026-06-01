import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  criar(@Body() body: {
    cliente_cpf: string;
    nomePet: string;
    especie: string;
    raca: string;
    idade: number;
    observacoes?: string;
  }) {
    return this.petsService.criar(body);
  }

  @Get()
  listar() {
    return this.petsService.listar();
  }

  @Get('cliente/:cpf')
  listarPorCliente(@Param('cpf') cpf: string) {
    return this.petsService.listarPorCliente(cpf);
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.petsService.buscarPorId(Number(id));
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() body: {
    nomePet?: string;
    especie?: string;
    raca?: string;
    idade?: number;
    observacoes?: string;
  }) {
    return this.petsService.atualizar(Number(id), body);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.petsService.excluir(Number(id));
  }
}
