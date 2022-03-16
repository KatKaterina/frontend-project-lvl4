import * as Yup from 'yup';

const schema = Yup.object().shape({
  userName: Yup.string(),
  password: Yup.string()
    .min(6, 'Too Short! Minimum 6 symbols')
    .required(),
});

export default schema;
