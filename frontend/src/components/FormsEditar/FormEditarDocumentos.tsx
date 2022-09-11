import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { DocumentoContext } from '../../context/DocumentoContext';
import { ClienteContext } from '../../context/ClienteContext';
import { handleDescarga } from '../../helpers/handleDescarga';
import { Documento } from '../../types/Documento';
import { documentosService } from '../../services/documentos.service';

type FormValues = {
  documentos: {
    nombre: string;
    file: File | null;
  }[];
};

export const FormEditarDocumentos = () => {
  const navigate = useNavigate();

  const { cliente } = useContext(ClienteContext);

  const [documentos, setDocumentos] = useState(cliente.documentos);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      documentos: [{ nombre: '', file: null }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'documentos',
    control,
  });

  const onSubmit = async (data: FormValues) => {
    await documentosService.crearVarios(data.documentos, cliente.id!);
    navigate('/');
  };

  const eliminarDocumento = async (documento: Documento) => {
    await documentosService.eliminar(cliente.id!, documento.id!);
    setDocumentos(documentos?.filter((item) => item.id !== documento.id));
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Editar documentos</h2>
      </div>

      <Row className="mt-3">
        <Col>
          <h4>Documentos actuales</h4>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documentos?.map((documento) => (
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
                  <td>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => eliminarDocumento(documento)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-5">
        <div className="d-flex justify-content-between mb-4">
          <h4>Nuevos documentos</h4>
          <Button
            type="button"
            onClick={() =>
              append({
                nombre: '',
                file: null,
              })
            }
          >
            Agregar Nuevo
          </Button>
        </div>
      </Row>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={'section mb-2'} key={field.id}>
                <Row>
                  {/*INPUT nombre*/}

                  <Col>
                    <input
                      placeholder="Nombre"
                      {...register(`documentos.${index}.nombre` as const, {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </Col>

                  {/*INPUT file*/}
                  <Col>
                    <input
                      placeholder="Archivo"
                      type="file"
                      {...register(`documentos.${index}.file` as const, {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </Col>

                  <Col>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </section>
            </div>
          );
        })}

        <Button variant="primary mt-3 me-3" type="submit">
          Actualizar
        </Button>
      </form>
    </Container>
  );
};
