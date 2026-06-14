import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CriarClienteDto } from './dto/criar-cliente.dto';
import { AtualizarClienteDto } from './dto/atualizar-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  criar(@Body() body: CriarClienteDto) {
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
  atualizar(@Param('cpf') cpf: string, @Body() body: AtualizarClienteDto) {
    return this.clientesService.atualizar(cpf, body);
  }

  @Delete(':cpf')
  excluir(@Param('cpf') cpf: string) {
    return this.clientesService.excluir(cpf);
  }
}

