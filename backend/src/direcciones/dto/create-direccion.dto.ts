import { IsString } from 'class-validator';

export class CreateDireccionDto {
  @IsString()
  departamento: string;

  @IsString()
  municipio: string;

  @IsString()
  detalles: string;
}
