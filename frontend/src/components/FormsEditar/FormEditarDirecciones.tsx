import { useFieldArray, useForm } from 'react-hook-form';

import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { DireccionContext } from '../../context/DireccionContext';
import { ClienteContext } from '../../context/ClienteContext';
import { direccionesService } from '../../services/direcciones.service';
import { Direccion } from '../../types/Direccion';

type FormValues = {
  direcciones: Direccion[];
};

export const FormEditarDirecciones = () => {
  const navigate = useNavigate();

  const { cliente } = useContext(ClienteContext);
  const { direcciones, setDirecciones } = useContext(DireccionContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      direcciones,
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'direcciones',
    control,
  });

  const handleEliminarDireccion = async (index: number) => {
    if (direcciones[index].id !== undefined) {
      await direccionesService.eliminar(cliente.id!, direcciones[index].id!);
    }

    remove(index);
  };

  const onSubmit = async (data: FormValues) => {
    setDirecciones(data.direcciones);

    const direccionesActualizar = data.direcciones.filter(
      (direccion) => direccion.id !== undefined,
    );

    await direccionesService.actualizarVarios(
      direccionesActualizar,
      cliente.id!,
    );

    const direccionesCrear = data.direcciones.filter(
      (direccion) => direccion.id === undefined,
    );

    await direccionesService.crearVarios(direccionesCrear, cliente.id!);

    navigate(`/clientes/editar/${cliente.id}/documentos`);
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-5">
        <h2>Editar direcciones</h2>

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
                      className="form-control"
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
                      className="form-control"
                    />
                  </Col>

                  {/*INPUT detalles*/}
                  <Col>
                    <input
                      placeholder="Detalles"
                      type="text"
                      {...register(`direcciones.${index}.detalles` as const, {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </Col>

                  <Col>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => handleEliminarDireccion(index)}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </section>
            </div>
          );
        })}

        <Button variant="primary me-3" type="submit">
          Siguiente
        </Button>
      </form>
    </Container>
  );
};
