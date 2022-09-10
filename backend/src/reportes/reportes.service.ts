import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ObjectsToCsv from 'objects-to-csv';
import { Repository } from 'typeorm';

import { Cliente } from '../clientes/entities/cliente.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
  ) {}

  async generar() {
    const clientes = await this.clientesRepository.find({
      relations: ['direcciones', 'documentos'],
    });

    // Convertir a CSV
    const csv = new ObjectsToCsv(clientes);

    // Guardar en disco
    await csv.toDisk('./reporte.csv');

    return csv;
  }
}
