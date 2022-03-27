import * as yup from 'yup';
import store from './slices/index.js';

const schema = yup.object().shape({
  username: yup.string()
    .trim()
    .required()
    .min(3, 'errors.wrongLength')
    .max(20, 'errors.wrongLength'),
  password: yup.string()
    .min(6, 'errors.wrongLengthPass')
    .required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'errors.notMatch')
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
