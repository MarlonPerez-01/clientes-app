import { IsOptional, IsString } from 'class-validator';

export class CreateDocumentoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  file: any;
}
