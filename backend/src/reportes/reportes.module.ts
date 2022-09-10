import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientesModule } from '../clientes/clientes.module';
import { Cliente } from '../clientes/entities/cliente.entity';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), ClientesModule],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
