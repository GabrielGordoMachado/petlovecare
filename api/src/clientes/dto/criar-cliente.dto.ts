import { IsString, IsEmail, Length, MinLength } from 'class-validator';

export class CriarClienteDto {
  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter 11 dígitos.' })
  cpf: string;

  @IsString()
  @Length(1, 100)
  nome: string;

  @IsString()
  @Length(1, 15)
  telefone: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres.' })
  senha: string;
}
