import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  criar(@Body() body: {
    agendamento_id: number;
    cliente_cpf: string;
    nota: number;
    comentario: string;
  }) {
    return this.feedbackService.criar(body);
  }

  @Get()
  listar() {
    return this.feedbackService.listar();
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.feedbackService.buscarPorId(Number(id));
  }

  @Put(':id/responder')
  responder(@Param('id') id: string, @Body() body: {
    admin_cpf: string;
    resposta: string;
  }) {
    return this.feedbackService.responder(Number(id), body.admin_cpf, body.resposta);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.feedbackService.excluir(Number(id));
  }
}
