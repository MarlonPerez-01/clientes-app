import { Table } from 'react-bootstrap';
import React, { useContext } from 'react';
import { ItemTabla } from './ItemTabla';

import { ClienteContext } from '../../context/ClienteContext';

export const TableClientes = () => {
  const { clientes } = useContext(ClienteContext);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Edad</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <ItemTabla key={cliente.id} cliente={cliente} />
        ))}
      </tbody>
    </Table>
  );
};
