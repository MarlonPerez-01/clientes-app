import * as yup from 'yup';

export const crearDireccionSchema = yup
  .object({
    departamento: yup.string().required('El campo departamento es obligatorio'),
    municipio: yup.string().required('El campo municipio es obligatorio'),
    calle: yup.string().required('El campo calle es obligatorio'),
  })
  .required();
