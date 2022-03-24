import * as yup from 'yup';
import store from './slices/index.js';

const schema = yup.object().shape({
  userName: yup.string()
    .required(),
  password: yup.string()
    .min(6, 'Too Short! Minimum 6 symbols')
    .required(),
});

export const getSchemaForChannel = (channels) => {
  const schemaForChannel = yup.object().shape({
    name: yup.string()
    .trim()
    .notOneOf(channels, 'errors.notUnique')
    .required('errors.fieldEmpty')
    .min(3, 'errors.wrongLength')
    .max(20, 'errors.wrongLength'),
  });
  return schemaForChannel;
}

export default schema;
