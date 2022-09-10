import React, { useContext } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { documentosService } from '../../services/documentos.service';
import { DocumentoContext } from '../../context/DocumentoContext';
import { clientesService } from '../../services/clientes.service';
import { ClienteContext } from '../../context/ClienteContext';
import { direccionesService } from '../../services/direcciones.service';
import { DireccionContext } from '../../context/DireccionContext';

type FormValues = {
  documentos: {
    nombre: string;
    file: File | null;
  }[];
};

export const FormCrearDocumentos = () => {
  const navigate = useNavigate();

  const { cliente, setCliente, handleObtenerClientes } =
    useContext(ClienteContext);
  const { direcciones, setDirecciones } = useContext(DireccionContext);
  const { documentos, setDocumentos } = useContext(DocumentoContext);

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
    setDocumentos(data.documentos);

    // Realizar peticiones
    const response = await clientesService.crear({
      primerNombre: cliente.primerNombre,
      segundoNombre: cliente.segundoNombre,
      primerApellido: cliente.primerApellido,
      segundoApellido: cliente.segundoApellido,
      edad: cliente.edad,
      correo: cliente.correo,
    });

    await direccionesService.crearVarios(direcciones, response.data.id);

    await documentosService.crearVarios(data.documentos, response.data.id);

    // limpiar el estado
    setCliente({});
    setDirecciones([]);
    setDocumentos([]);

    // obtiene los clientes
    handleObtenerClientes();

    navigate('/');
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-5">
        <h2>Crear documentos</h2>

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
                {/*INPUT nombre*/}
                <Row>
                  <Col>
                    <input
                      placeholder="Nombre"
                      {...register(`documentos.${index}.nombre` as const, {
                        required: true,
                      })}
                      className="form-control"
                    />
                  </Col>

                  <Col>
                    {/*INPUT file*/}
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

        <Button variant="primary me-3" type="submit">
          Guardar cliente
        </Button>
      </form>
    </Container>
  );
};
