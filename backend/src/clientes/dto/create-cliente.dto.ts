import { IsEmail, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  primerNombre: string;

  @IsString()
  segundoNombre: string;

  @IsString()
  primerApellido: string;

  @IsString()
  segundoApellido: string;

  @IsNumber()
  @IsPositive()
  edad: number;

  @IsEmail()
  correo: string;
}
