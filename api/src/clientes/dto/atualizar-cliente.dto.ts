import { IsString, IsEmail, Length, MinLength, IsOptional } from 'class-validator';

export class AtualizarClienteDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nome?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  telefone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido.' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres.' })
  senha?: string;
}
