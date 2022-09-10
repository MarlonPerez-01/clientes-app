import * as yup from 'yup';

export const crearClienteSchema = yup
  .object({
    primerNombre: yup
      .string()
      .required('El campo primer nombre es obligatorio'),
    segundoNombre: yup.string(),
    primerApellido: yup
      .string()
      .required('El campo primer apellido es obligatorio'),
    segundoApellido: yup.string(),
    edad: yup
      .number()
      .typeError('El campo edad debe ser un número')
      .required('El campo edad es obligatoria'),
    correo: yup
      .string()
      .email('Debe ingresar un correo válido')
      .required('El campo correo es obligatorio'),
  })
  .required();
