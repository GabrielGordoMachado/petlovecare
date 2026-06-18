import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { AtualizarStatusDto } from './dto/atualizar-status.dto';

@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  criar(@Body() body: {
    cliente_cpf: string;
    pet_id: number;
    servico_ids: number[];
    data_hora: string;
    observacao?: string;
  }) {
    return this.agendamentosService.criar(body);
  }

  @Get()
  listar() {
    return this.agendamentosService.listar();
  }

  @Get('cliente/:cpf')
  listarPorCliente(@Param('cpf') cpf: string) {
    return this.agendamentosService.listarPorCliente(cpf);
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.agendamentosService.buscarPorId(Number(id));
  }

  @Put(':id/status')
  atualizarStatus(@Param('id') id: string, @Body() body: AtualizarStatusDto) {
    return this.agendamentosService.atualizarStatus(Number(id), body.status, body.admin_cpf);
  }

  @Delete(':id')
  cancelar(@Param('id') id: string) {
    return this.agendamentosService.cancelar(Number(id));
  }
}
