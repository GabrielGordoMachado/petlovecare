import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Libera o acesso dos frontends (web em localhost:5173 e desktop Electron)
  app.enableCors();

  // Valida automaticamente os corpos das requisições contra os DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // rejeita requisição com campos desconhecidos
      transform: true, // converte tipos (ex: "5" -> 5) conforme o DTO
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API rodando na porta ${port}`);
}
bootstrap();
