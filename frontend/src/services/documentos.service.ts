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

export const documentosService = {
  crearVarios,
};
