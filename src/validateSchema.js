import * as yup from 'yup';

const schema = yup.object().shape({
  userName: yup.string()
    .required(),
  password: yup.string()
    .min(6, 'Too Short! Minimum 6 symbols')
    .required(),
});

export const schemaForChannel = yup.object().shape({
  name: yup.string()
  .trim()
  .required('errors.fieldEmpty')
  .min(3, 'errors.wrongLength')
  .max(20, 'errors.wrongLength'),
});

export default schema;
