import { BotonVerMas } from '../Botones/BotonVerMas';
import { BotonEditar } from '../Botones/BotonEditar';
import { BotonEliminar } from '../Botones/BotonEliminar';
import React from 'react';
import { Cliente } from '../../types/Cliente';

export type ItemTablaProps = {
  cliente: Cliente;
};

export const ItemTabla: React.FC<ItemTablaProps> = ({ cliente }) => {
  return (
    <tr>
      <td>{cliente.id}</td>
      <td>
        {cliente.primerNombre} {cliente.segundoNombre}
      </td>
      <td>
        {cliente.primerApellido} {cliente.segundoApellido}
      </td>
      <td>{cliente.edad}</td>
      <td>{cliente.correo}</td>
      <td>
        <BotonVerMas id={cliente.id} />
        <BotonEditar id={cliente.id} />
        <BotonEliminar id={cliente.id} />
      </td>
    </tr>
  );
};
