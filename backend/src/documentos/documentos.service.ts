import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Documento } from './entities/documento.entity';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentosRepository: Repository<Documento>,
  ) {}

  async create(
    clienteId: number,
    file: Express.Multer.File,
    createDocumentoDto: CreateDocumentoDto,
  ) {
    const documento = this.documentosRepository.create({
      clienteId,
      ruta: file.path,
      ...createDocumentoDto,
    });
    return this.documentosRepository.save(documento);
  }

  async update(
    clienteId: number,
    documentoId,
    updateDocumentoDto: UpdateDocumentoDto,
  ) {
    const documento = await this.documentosRepository.findOneBy({
      id: documentoId,
      clienteId,
    });

    if (!documento) {
      throw new NotFoundException(`Documento #${documentoId} no encontrado`);
    }

    const documentoActualizado = this.documentosRepository.create({
      ...documento,
      ...updateDocumentoDto,
    });

    return this.documentosRepository.save(documentoActualizado);
  }

  async remove(clienteId: number, documentoId: number) {
    const documento = await this.documentosRepository.findOneBy({
      id: documentoId,
      clienteId,
    });

    if (!documento) {
      throw new NotFoundException(`Documento #${documentoId} no encontrado`);
    }

    await this.documentosRepository.softDelete({ id: documentoId, clienteId });

    return documento;
  }
}
