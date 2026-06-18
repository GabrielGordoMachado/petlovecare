import { IsIn, IsString, IsOptional, Length } from 'class-validator';

// Status válidos do agendamento (espelham o enum StatusAgendamento do schema Prisma).
const STATUS_VALIDOS = ['agendado', 'em_andamento', 'finalizado', 'cancelado'] as const;

export class AtualizarStatusDto {
  @IsIn(STATUS_VALIDOS, {
    message: `status deve ser um de: ${STATUS_VALIDOS.join(', ')}.`,
  })
  status: (typeof STATUS_VALIDOS)[number];

  // CPF do administrador que aprovou/alterou o status (opcional).
  @IsOptional()
  @IsString()
  @Length(11, 11, { message: 'O CPF do administrador deve ter 11 dígitos.' })
  admin_cpf?: string;
}
