import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { PetsModule } from './pets/pets.module';
import { ServicosModule } from './servicos/servicos.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ClientesModule,
    AdministradoresModule,
    PetsModule,
    ServicosModule,
    AgendamentosModule,
    FeedbackModule,
  ],
})
export class AppModule {}
