export type Documento = {
  id: number;
  clienteId: number;
  nombre: string;
  ruta: string;
  createdAt?: Date;
  deletedAt?: Date;
};
