import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Listado } from './pages/Cliente/Listado';
import { FormCrearDirecciones } from './components/FormsCrear/FormCrearDirecciones';
import { FormCrearDocumentos } from './components/FormsCrear/FormCrearDocumentos';
import NotFound from './components/Common/NotFound';
import { Detalle } from './pages/Cliente/Detalle';
import { Eliminar } from './pages/Cliente/Eliminar';
import { ClienteProvider } from './context/ClienteProvider';
import { Editar } from './pages/Cliente/Editar';
import { Crear } from './pages/Cliente/Crear';
import { FormEditarDirecciones } from './components/FormsEditar/FormEditarDirecciones';
import { FormEditarDocumentos } from './components/FormsEditar/FormEditarDocumentos';
import { DocumentoProvider } from './context/DocumentoProvider';
import { DireccionProvider } from './context/DireccionProvider';

function App() {
  return (
    <>
      <BrowserRouter>
        <ClienteProvider>
          <DireccionProvider>
            <DocumentoProvider>
              <Routes>
                <Route path="/" element={<Listado />} />
                <Route path="clientes" element={<Listado />} />
                <Route path="clientes/:clienteId" element={<Detalle />} />
                <Route path="clientes/crear" element={<Crear />} />
                <Route
                  path="clientes/crear/direcciones"
                  element={<FormCrearDirecciones />}
                />
                <Route
                  path="clientes/crear/documentos"
                  element={<FormCrearDocumentos />}
                />
                <Route path="clientes/editar/:clienteId" element={<Editar />} />
                <Route
                  path="clientes/editar/:clienteId/direcciones"
                  element={<FormEditarDirecciones />}
                />
                <Route
                  path="clientes/editar/:clienteId/documentos"
                  element={<FormEditarDocumentos />}
                />
                <Route
                  path="clientes/eliminar/:clienteId"
                  element={<Eliminar />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DocumentoProvider>
          </DireccionProvider>
        </ClienteProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
