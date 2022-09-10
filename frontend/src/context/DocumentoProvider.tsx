import React, { useState } from 'react';

import { DocumentoContext } from './DocumentoContext';
import { CrearDocumentoDto } from '../types/CrearDocumentoDto';

type DocumentoProps = {
  children: React.ReactNode;
};

export const DocumentoProvider = (props: DocumentoProps) => {
  const [documentos, setDocumentos] = useState<Partial<CrearDocumentoDto>[]>(
    [],
  );
  const [documento, setDocumento] = useState<Partial<CrearDocumentoDto>>({});

  return (
    <DocumentoContext.Provider
      value={{
        documentos,
        documento,

        setDocumentos,
      }}
    >
      {props.children}
    </DocumentoContext.Provider>
  );
};
