import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { DireccionesService } from '../direcciones/direcciones.service';
import { CreateDireccionDto } from '../direcciones/dto/create-direccion.dto';
import { UpdateDireccionDto } from '../direcciones/dto/update-direccion.dto';
import { DocumentosService } from '../documentos/documentos.service';
import { CreateDocumentoDto } from '../documentos/dto/create-documento.dto';
import { LocalFileInterceptor } from '../local-file/interceptors/local-file-interceptor';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { FindClientesDto } from './dto/find-clientes.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly direccionesService: DireccionesService,
    private readonly documentosService: DocumentosService,
  ) {}

  // Rutas para manejar las operaciones CRUD de la entidad Cliente
  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  async findAll(@Query() findClientesDto: FindClientesDto) {
    return this.clientesService.findAll(findClientesDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.clientesService.remove(id);
  }

  // Rutas para manejar las direcciones de un cliente
  @Post(':id/direcciones')
  async crearDireccion(
    @Param('id') id: number,
    @Body() createDireccionDto: CreateDireccionDto,
  ) {
    return this.direccionesService.create(id, createDireccionDto);
  }

  @Patch(':id/direcciones/:idDireccion')
  async updateDireccion(
    @Param('id') id: number,
    @Param('idDireccion') idDireccion: number,
    @Body() updateDireccionDto: UpdateDireccionDto,
  ) {
    return this.direccionesService.update(id, idDireccion, updateDireccionDto);
  }

  @Delete(':id/direcciones/:idDireccion')
  async removeDireccion(
    @Param('id') id: number,
    @Param('idDireccion') idDireccion: number,
  ) {
    return this.direccionesService.remove(id, idDireccion);
  }

  // Rutas para manejar los documentos de un cliente
  @Post(':id/documentos')
  @UseInterceptors(
    LocalFileInterceptor({ fieldName: 'file', path: '/documentos' }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() createDocumentoDto: CreateDocumentoDto,
  ) {
    return this.clientesService.uploadFile(id, file, createDocumentoDto);
  }

  @Delete(':id/documentos/:idDocumento')
  async removeDocumento(
    @Param('id') id: number,
    @Param('idDocumento') idDocumento: number,
  ) {
    return this.documentosService.remove(id, idDocumento);
  }
}
