import React, { useState } from 'react';
import { Cliente } from '../types/Cliente';

import { ClienteContext } from './ClienteContext';
import { clientesService } from '../services/clientes.service';
import { CrearClienteDto } from '../types/CrearClienteDto';

type ClienteProps = {
  children: React.ReactNode;
};

export const ClienteProvider = (props: ClienteProps) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Partial<Cliente>>({});

  const [paginacion, setPaginacion] = useState({
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalPages: 1,
    totalItems: 0,
  });

  const handleAgregarCliente = (cliente: CrearClienteDto): void => {
    (async () => {
      const res = await clientesService.crear(cliente);
      setClientes([...clientes, res.data.data]);
    })();
  };

  async function handleObtenerClientes(page?: number) {
    console.log('entrando a obtener clientes');

    const res = await clientesService.obtener(page!);
    setClientes(res.data.data);

    setPaginacion({
      currentPage: res.data.currentPage,
      nextPage: res.data.nextPage,
      previousPage: res.data.previousPage,
      totalItems: res.data.totalItems,
      totalPages: res.data.totalPages,
    });
  }

  async function handleObtenerClienteById(id: number) {
    const response = await clientesService.obtenerById(id);
    setCliente(response.data);
  }

  const handleActualizarCliente = (id: number, cliente: Cliente): void => {};

  const handleEliminarCliente = (id: number): void => {
    (async () => {
      await clientesService.eliminar(id);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    })();
  };

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        cliente,

        paginacion,

        setCliente,

        handleObtenerClientes,
        handleObtenerClienteById,
        handleAgregarCliente,
        handleActualizarCliente,
        handleEliminarCliente,
      }}
    >
      {props.children}
    </ClienteContext.Provider>
  );
};
