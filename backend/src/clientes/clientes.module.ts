import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DireccionesModule } from '../direcciones/direcciones.module';
import { DocumentosModule } from '../documentos/documentos.module';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    DireccionesModule,
    DocumentosModule,
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
