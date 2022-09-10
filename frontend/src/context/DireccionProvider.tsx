import React, { useState } from 'react';
import { Direccion } from '../types/Direccion';

import { DireccionContext } from './DireccionContext';

type DireccionProps = {
  children: React.ReactNode;
};

export const DireccionProvider = (props: DireccionProps) => {
  const [direcciones, setDirecciones] = useState<Partial<Direccion>[]>([]);
  const [direccion, setDireccion] = useState<Partial<Direccion>>({});

  return (
    <DireccionContext.Provider
      value={{
        direcciones,
        direccion,

        setDirecciones,
      }}
    >
      {props.children}
    </DireccionContext.Provider>
  );
};
