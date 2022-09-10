import React from 'react';
import { Direccion } from '../types/Direccion';

export interface DireccionContextInterface {
  direccion: Partial<Direccion>;
  direcciones: Partial<Direccion>[];

  setDirecciones: React.Dispatch<React.SetStateAction<Partial<Direccion>[]>>;
}

export const DireccionContext = React.createContext<DireccionContextInterface>({
  direcciones: [],
  direccion: {},

  setDirecciones: () => {},
});

DireccionContext.displayName = 'DireccionContext';
