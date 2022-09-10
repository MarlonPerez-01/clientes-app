import { useForm } from 'react-hook-form';
import { Button, Container, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { crearClienteSchema } from '../../schemas/crear-cliente.schema';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { ClienteContext } from '../../context/ClienteContext';
import { clientesService } from '../../services/clientes.service';

type CrearCliente = {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  edad: number;
  correo: string;
};

export const FormEditarCliente = () => {
  const navigate = useNavigate();

  const { cliente, setCliente, handleObtenerClientes } =
    useContext(ClienteContext);

  useEffect(() => {
    if (!cliente.id) {
      navigate('/');
    }
  }, [cliente, navigate]);

  const onSubmit = async (data: CrearCliente) => {
    setCliente(data);

    await clientesService.actualizar(cliente.id!, {
      primerNombre: data.primerNombre,
      segundoNombre: data.segundoNombre,
      primerApellido: data.primerApellido,
      segundoApellido: data.segundoApellido,
      edad: data.edad,
      correo: data.correo,
    });

    await handleObtenerClientes();

    navigate(`/clientes/editar/${cliente.id}/direcciones`);
  };

  const onError = (error: any) => {
    console.log('ERROR:::', error);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearCliente>({
    resolver: yupResolver(crearClienteSchema),
    defaultValues: cliente,
  });

  const { clientes } = useContext(ClienteContext);
  console.log(clientes);

  return (
    <Container className="mt-5">
      <h2 className="mb-5">Editar Cliente</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {/*INPUT primerNombre*/}
        <Form.Group className="mb-3" controlId="primerNombre">
          <Form.Label>Primer Nombre</Form.Label>
          <Form.Control type="text" {...register('primerNombre')} />
          {errors.primerNombre && (
            <Form.Text className="text-danger">
              {errors.primerNombre.message}
            </Form.Text>
          )}
        </Form.Group>

        {/*INPUT segundoNombre*/}
        <Form.Group className="mb-3" controlId="segundoNombre">
          <Form.Label>Segundo Nombre</Form.Label>
          <Form.Control type="text" {...register('segundoNombre')} />
          {errors.segundoNombre && (
            <Form.Text className="text-danger">
              {errors.segundoNombre.message}
            </Form.Text>
          )}
        </Form.Group>

        {/*INPUT primerApellido*/}
        <Form.Group className="mb-3" controlId="primerApellido">
          <Form.Label>Primer Apellido</Form.Label>
          <Form.Control type="text" {...register('primerApellido')} />
          {errors.primerApellido && (
            <Form.Text className="text-danger">
              {errors.primerApellido.message}
            </Form.Text>
          )}
        </Form.Group>

        {/*INPUT segundApellido*/}
        <Form.Group className="mb-3" controlId="segundoApellido">
          <Form.Label>Segundo Apellido</Form.Label>
          <Form.Control type="text" {...register('segundoApellido')} />
          {errors.segundoApellido && (
            <Form.Text className="text-danger">
              {errors.segundoApellido.message}
            </Form.Text>
          )}
        </Form.Group>

        {/*INPUT edad*/}
        <Form.Group className="mb-3" controlId="edad">
          <Form.Label>Edad</Form.Label>
          <Form.Control type="number" {...register('edad')} />
          {errors.edad && (
            <Form.Text className="text-danger">{errors.edad.message}</Form.Text>
          )}
        </Form.Group>

        {/*INPUT correo*/}
        <Form.Group className="mb-3" controlId="correo">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="text" {...register('correo')} />
          {errors.correo && (
            <Form.Text className="text-danger">
              {errors.correo.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button type="submit" variant="primary me-3">
          Siguiente
        </Button>

        <Link to="/">
          <Button className="btn btn-danger">Cancelar</Button>
        </Link>
      </form>
    </Container>
  );
};
