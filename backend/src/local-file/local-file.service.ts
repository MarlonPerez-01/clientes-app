import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Documento } from '../documentos/entities/documento.entity';

@Injectable()
export class LocalFileService {
  constructor(
    @InjectRepository(Documento)
    private documentoRepository: Repository<Documento>,
  ) {}

  async getFileByNombreDB(ruta: string) {
    const file = await this.documentoRepository.findOneBy({
      ruta: `uploads/documentos/${ruta}`,
    });

    if (!file) throw new NotFoundException('No existe el archivo');
    return file;
  }
}
