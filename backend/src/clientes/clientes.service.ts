import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { paginate } from '../common/helpers/paginate';
import { DocumentosService } from '../documentos/documentos.service';
import { CreateDocumentoDto } from '../documentos/dto/create-documento.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { FindClientesDto } from './dto/find-clientes.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
    private readonly documentoService: DocumentosService,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    return this.clientesRepository.save(createClienteDto);
  }

  async findAll(findClientesDto: FindClientesDto) {
    const { page, limit, sort, order } = findClientesDto;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.clientesRepository.findAndCount({
      take: limit,
      skip,
      order: { [sort]: order },
    });

    const pagination = paginate(page, limit, totalItems);

    return {
      data,
      totalItems,
      ...pagination,
    };
  }

  async findOne(id: number) {
    const cliente = await this.clientesRepository.findOne({
      where: { id },
      relations: ['direcciones', 'documentos'],
    });

    if (!cliente) throw new NotFoundException(`Cliente #${id} no encontrado`);
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    const clienteActualizado = this.clientesRepository.create({
      ...cliente,
      ...updateClienteDto,
    });

    await this.clientesRepository.save(clienteActualizado);
    return clienteActualizado;
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    await this.clientesRepository.softDelete(id);
    return cliente;
  }

  async uploadFile(
    clienteId: number,
    file: Express.Multer.File,
    createDocumentoDto: CreateDocumentoDto,
  ) {
    return this.documentoService.create(clienteId, file, createDocumentoDto);
  }
}
