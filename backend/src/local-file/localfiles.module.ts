import { Module } from '@nestjs/common';
import { LocalFileController } from './local-file.controller';
import { LocalFileService } from './local-file.service';
import { DocumentosModule } from '../documentos/documentos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from '../documentos/entities/documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Documento]), DocumentosModule],
  controllers: [LocalFileController],
  providers: [LocalFileService],
  exports: [],
})
export class LocalfilesModule {}
