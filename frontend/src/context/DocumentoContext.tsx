import React from 'react';
import { CrearDocumentoDto } from '../types/CrearDocumentoDto';

export interface DocumentoContextInterface {
  documento: Partial<CrearDocumentoDto>;
  documentos: Partial<CrearDocumentoDto>[];

  setDocumentos: React.Dispatch<
    React.SetStateAction<Partial<CrearDocumentoDto>[]>
  >;
}

export const DocumentoContext = React.createContext<DocumentoContextInterface>({
  documentos: [{ nombre: '', file: null }],
  documento: {},

  setDocumentos: () => {},
});

DocumentoContext.displayName = 'DocumentoContext';
