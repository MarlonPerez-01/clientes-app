import { clienteAxios } from '../config/axios';
import axios from 'axios';
import { CrearDireccionDto } from '../types/CrearDireccionDto';
import { Direccion } from '../types/Direccion';

const crearVarios = async (
  direcciones: Partial<CrearDireccionDto>[],
  clienteId: number,
) => {
  await axios.all(
    direcciones.map(async (direccion) =>
      clienteAxios.post(`clientes/${clienteId}/direcciones`, direccion),
    ),
  );
};

const actualizarVarios = async (
  direcciones: Partial<Direccion>[],
  clienteId: number,
) => {
  await axios.all(
    direcciones.map(async (direccion) =>
      clienteAxios.patch(`clientes/${clienteId}/direcciones/${direccion.id}`, {
        departamento: direccion.departamento,
        municipio: direccion.municipio,
        detalles: direccion.detalles,
      }),
    ),
  );
};

const eliminar = async (clienteId: number, direccionId: number) => {
  await clienteAxios.delete(`clientes/${clienteId}/direcciones/${direccionId}`);
};

export const direccionesService = {
  crearVarios,
  actualizarVarios,
  eliminar,
};
