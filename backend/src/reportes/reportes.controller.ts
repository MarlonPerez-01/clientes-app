import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as path from 'path';

import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get()
  @Header('Content-Type', 'application/csv')
  @Header('Content-Disposition', 'attachment; filename="reporte.csv"')
  async findAll(): Promise<StreamableFile> {
    await this.reportesService.generar();

    const file = createReadStream(path.join(process.cwd(), 'reporte.csv'));

    return new StreamableFile(file);
  }
}
