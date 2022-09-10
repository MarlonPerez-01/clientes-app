import React from 'react';
import { Cliente } from '../types/Cliente';
import { CrearClienteDto } from '../types/CrearClienteDto';

export interface ClienteContextInterface {
  clientes: Cliente[];
  cliente: Partial<Cliente>;

  paginacion: any;

  setCliente: React.Dispatch<React.SetStateAction<Partial<Cliente>>>;

  handleAgregarCliente: (cliente: CrearClienteDto) => void;
  handleObtenerClientes: (page?: number) => void;
  handleObtenerClienteById: (id: number) => void;
  handleActualizarCliente: (id: number, cliente: Cliente) => void;
  handleEliminarCliente: (id: number) => void;
}

export const ClienteContext = React.createContext<ClienteContextInterface>({
  clientes: [],
  cliente: {},

  paginacion: {},

  setCliente: () => {},

  handleObtenerClientes(page?: number): void {},
  handleObtenerClienteById(id: number): void {},
  handleAgregarCliente(cliente: CrearClienteDto): void {},
  handleActualizarCliente(id: number, cliente: Cliente): void {},
  handleEliminarCliente(id: number): void {},
});

ClienteContext.displayName = 'ClienteContext';
