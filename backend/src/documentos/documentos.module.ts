import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentosService } from './documentos.service';
import { Documento } from './entities/documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Documento])],
  providers: [DocumentosService],
  exports: [DocumentosService],
})
export class DocumentosModule {}
