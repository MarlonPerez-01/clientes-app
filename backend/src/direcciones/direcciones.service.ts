import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { Direccion } from './entities/direccion.entity';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionesRepository: Repository<Direccion>,
  ) {}

  async create(clienteId: number, createDireccionDto: CreateDireccionDto) {
    return this.direccionesRepository.save({
      clienteId,
      ...createDireccionDto,
    });
  }

  async findOne(id: number) {
    const direccion = await this.direccionesRepository.findOneBy({ id });
    if (!direccion) {
      throw new NotFoundException(`Direccion #${id} no encontrada`);
    }
    return direccion;
  }

  async update(
    clienteId: number,
    direccionId: number,
    updateDireccionDto: UpdateDireccionDto,
  ) {
    // Obtengo la direccion segun el id de la direccion y el cliente
    const direccion = await this.direccionesRepository.findOne({
      where: { id: direccionId, clienteId },
    });

    if (!direccion) {
      throw new NotFoundException(`Direccion #${direccionId} no encontrada`);
    }

    const direccionActualizada = this.direccionesRepository.create({
      ...direccion,
      ...updateDireccionDto,
    });
    await this.direccionesRepository.save(direccionActualizada);
    return direccionActualizada;
  }

  async remove(clienteId: number, direccionId: number) {
    // Obtengo la direccion segun el id de la direccion y el cliente
    const direccion = await this.direccionesRepository.findOne({
      where: { id: direccionId, clienteId },
    });

    if (!direccion) {
      throw new NotFoundException(`Direccion #${direccionId} no encontrada`);
    }

    await this.direccionesRepository.softDelete({ id: direccionId });
    return direccion;
  }
}
