import { CustomNavBar } from '../../components/Common/CustomNavBar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { TableClientes } from '../../components/Common/TableClientes';
import { CustomPagination } from '../../components/Common/Paginacion';
import React from 'react';
import { Link } from 'react-router-dom';
import { clientesService } from '../../services/clientes.service';

export const Listado = () => {
  const generarReporte = () => {
    clientesService.generarReporte();
  };

  return (
    <>
      <CustomNavBar />
      <Container className="App">
        <Row className="mt-3">
          <Col>
            <h3 className="">Clientes App</h3>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="justify-content d-flex justify-content-between">
            <Link to="/clientes/crear">
              <Button className="btn btn-primary">Agregar Cliente</Button>
            </Link>
            <Button className="btn btn-success" onClick={generarReporte}>
              Generar Reporte
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <TableClientes />
          </Col>
        </Row>
        <Row className="mt-3 ">
          <Col>
            <CustomPagination />
          </Col>
        </Row>
      </Container>
    </>
  );
};
