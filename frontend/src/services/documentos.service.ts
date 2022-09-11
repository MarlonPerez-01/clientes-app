import { clienteAxios } from '../config/axios';
import axios from 'axios';
import { CrearDocumentoDto } from '../types/CrearDocumentoDto';

const crearVarios = async (
  documentos: CrearDocumentoDto[],
  clienteId: number,
) => {
  return await axios.all(
    documentos.map(async (documento, index) => {
      const formData = new FormData();

      // @ts-ignore
      formData.append('file', documento?.file[0]);
      formData.append('nombre', documento.nombre);

      return await clienteAxios.post(
        `clientes/${clienteId}/documentos`,
        formData,
      );
    }),
  );
};

const eliminar = async (clienteId: number, documentoId: number) => {
  return await clienteAxios.delete(
    `clientes/${clienteId}/documentos/${documentoId}`,
  );
};

export const documentosService = {
  crearVarios,
  eliminar,
};
