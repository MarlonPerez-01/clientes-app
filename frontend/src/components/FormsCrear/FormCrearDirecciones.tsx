import * as React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { DireccionContext } from '../../context/DireccionContext';
import { useContext } from 'react';

type FormValues = {
  direcciones: {
    departamento: string;
    municipio: string;
    detalles: string;
  }[];
};

export const FormCrearDirecciones = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      direcciones: [{ departamento: '', municipio: '', detalles: '' }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'direcciones',
    control,
  });

  const { setDirecciones } = useContext(DireccionContext);

  const onSubmit = async (data: FormValues) => {
    setDirecciones(data.direcciones);
    // await direccionesService.crearVarios(data.direcciones);
    navigate('/clientes/crear/documentos');
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-5">
        <h2>Crear direcciones</h2>

        <Button
          type="button"
          onClick={() =>
            append({
              departamento: '',
              municipio: '',
              detalles: '',
            })
          }
        >
          Agregar nuevo
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={'section mb-2'} key={field.id}>
                <Row>
                  {/*INPUT departamento*/}
                  <Col>
                    <input
                      placeholder="Departamento"
                      {...register(
                        `direcciones.${index}.departamento` as const,
                        {
                          required: true,
                        },
                      )}
                      className={`form-control`}
                    />
                  </Col>

                  {/*INPUT municipio*/}
                  <Col>
                    <input
                      placeholder="Municipio"
                      type="text"
                      {...register(`direcciones.${index}.municipio` as const, {
                        required: true,
                      })}
                      className={`form-control`}
                    />
                    {errors?.direcciones?.[index]?.municipio && (
                      <Form.Text className="text-danger">
                        {errors?.direcciones?.[index]?.municipio?.message}
                      </Form.Text>
                    )}
                  </Col>

                  {/*INPUT detalles*/}
                  <Col>
                    <input
                      placeholder="Detalles"
                      type="text"
                      {...register(`direcciones.${index}.detalles` as const, {
                        required: true,
                      })}
                      className={`form-control`}
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
          Siguiente
        </Button>
      </form>
    </Container>
  );
};
