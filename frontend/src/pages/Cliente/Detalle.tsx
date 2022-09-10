import { Link, useParams } from 'react-router-dom';
import { CustomNavBar } from '../../components/Common/CustomNavBar';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { ClienteContext } from '../../context/ClienteContext';
import { clientesService } from '../../services/clientes.service';
import { Cliente } from '../../types/Cliente';

import { clienteAxios } from '../../config/axios';

export const Detalle: React.FC = () => {
  const { clienteId } = useParams();

  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    primerApellido: '',
    primerNombre: '',
    segundoApellido: '',
    segundoNombre: '',
    correo: '',
    direcciones: [],
    documentos: [],
    edad: 0,
    createdAt: undefined,
    deletedAt: undefined,
  });

  const [documentos, setDocumentos] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const data = await clientesService.obtenerById(parseInt(clienteId!));
      setCliente(data.data);
      setDocumentos(data.data.documentos);
    })();
  }, [clienteId]);

  const handleDescarga = async (documento: any) => {
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

  return (
    <>
      <CustomNavBar />
      <Container className="App">
        <Row className="mt-3">
          <div>
            <h2>Detalles del cliente # {clienteId}</h2>
          </div>
        </Row>

        <Row className="mt-2">
          <Col>
            <p className="fs-5">
              <span className="fw-bold">Nombres: </span>
              {cliente.primerNombre} {cliente.segundoNombre}
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="fs-5">
              <span className="fw-bold">Apellidos: </span>
              {cliente.primerApellido} {cliente.segundoApellido}
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="fs-5">
              <span className="fw-bold">Edad: </span>
              {cliente.edad}
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="fs-5">
              <span className="fw-bold">Correo: </span>
              {cliente.correo}
            </p>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <h2>Direcciones</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Departamento</th>
                  <th>Municipio</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {cliente.direcciones?.map((direccion) => (
                  <tr key={direccion.id}>
                    <td>{direccion.id}</td>
                    <td>{direccion.departamento}</td>
                    <td>{direccion.municipio}</td>
                    <td>{direccion.detalles}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <h2>Documentos</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Documento</th>
                </tr>
              </thead>
              <tbody>
                {cliente.documentos?.map((documento) => (
                  <tr key={documento.id}>
                    <td>{documento.id}</td>
                    <td>{documento.nombre}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => handleDescarga(documento)}
                      >
                        {documento.ruta.replace(/^.*[\\\/]/, '')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Link to="/clientes">
              <Button className="btn btn-sucess">Regresar</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
