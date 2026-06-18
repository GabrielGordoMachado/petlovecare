import { IsString, Length, IsOptional, IsIn } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter 11 dígitos.' })
  cpf: string;

  @IsString()
  senha: string;

  // 'cliente' (app web) ou 'administrador' (app desktop). Padrão: cliente.
  @IsOptional()
  @IsIn(['cliente', 'administrador'], { message: 'tipo deve ser cliente ou administrador.' })
  tipo?: 'cliente' | 'administrador';
}
