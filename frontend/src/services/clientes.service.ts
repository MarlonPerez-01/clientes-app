import { clienteAxios } from '../config/axios';
import { CrearClienteDto } from '../types/CrearClienteDto';

const obtener = async (page: number = 1) => {
  return clienteAxios.get(`clientes?page=${page}`);
};

const obtenerById = (id: number) => {
  return clienteAxios.get(`clientes/${id}`);
};

const crear = (cliente: Partial<CrearClienteDto>) => {
  console.log(cliente, 'desde cliente service');
  return clienteAxios.post('clientes', cliente);
};

const actualizar = (
  id: number,
  clienteActualizado: Partial<CrearClienteDto>,
) => {
  return clienteAxios.patch(`clientes/${id}`, clienteActualizado);
};

const eliminar = (id: number) => {
  return clienteAxios.delete(`/clientes/${id}`);
};

const generarReporte = async () => {
  return clienteAxios({
    url: 'reportes',
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte.csv');

    document.body.appendChild(link);
    link.click();
  });
};

export const clientesService = {
  obtener,
  obtenerById,
  crear,
  actualizar,
  eliminar,
  generarReporte,
};
