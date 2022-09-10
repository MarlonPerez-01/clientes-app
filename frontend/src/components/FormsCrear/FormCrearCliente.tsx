import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { crearClienteSchema } from '../../schemas/crear-cliente.schema';

import { ClienteContext } from '../../context/ClienteContext';

type CrearCliente = {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  edad: number;
  correo: string;
};

export const FormCrearCliente = () => {
  const navigate = useNavigate();
  const { setCliente } = useContext(ClienteContext);

  const onSubmit = (data: CrearCliente) => {
    setCliente(data);
    navigate('/clientes/crear/direcciones');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearCliente>({
    resolver: yupResolver(crearClienteSchema),
  });

  return (
    <Container className="mt-5">
      <h2 className="mb-5">Crear Cliente</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
