import React, { useContext } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { DocumentoContext } from '../../context/DocumentoContext';
import { ClienteContext } from '../../context/ClienteContext';

type FormValues = {
  documentos: {
    nombre: string;
    file: File | null;
  }[];
};

export const FormEditarDocumentos = () => {
  const navigate = useNavigate();

  const { documentos } = useContext(DocumentoContext);
  const { cliente } = useContext(ClienteContext);

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
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-5">
        <h2>Editar documentos</h2>

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
          Actualizar cliente
        </Button>
      </form>
    </Container>
  );
};
