import { Direccion } from './Direccion';
import { Documento } from './Documento';

export type Cliente = {
  id: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  edad: number;
  correo: string;
  direcciones?: Direccion[];
  documentos?: Documento[];
  createdAt?: Date;
  deletedAt?: Date;
};
