import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as path from 'path';

import { LocalFileService } from './local-file.service';

@Controller('local-file')
export class LocalFileController {
  constructor(private localFileService: LocalFileService) {}

  @Get(':nombre')
  async getFileByNombre(
    @Param('nombre') nombre: string,
  ): Promise<StreamableFile> {
    const fileDB = await this.localFileService.getFileByNombreDB(nombre);

    const file = createReadStream(path.join(process.cwd(), fileDB.ruta));

    return new StreamableFile(file);
  }
}
