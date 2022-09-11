import { clienteAxios } from '../config/axios';

export const handleDescarga = async (documento: any) => {
  const nombreArchivo = documento.ruta.replace(/^.*[\\\/]/, '');

  return clienteAxios({
    url: `local-file/${nombreArchivo}`,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nombreArchivo);

    document.body.appendChild(link);
    link.click();
  });
};
