import * as yup from 'yup';
//import { useSelector } from 'react-redux';
//import { selectorChannels } from './slices/ChannelsSlice.js';
import store from './slices/index.js';

//const channels = store.getState().channels.map((channel) => channel.name);
//console.log(channels);

//const channels = useSelector(selectorChannels.selectAll).map((channel) => channel.name);

const schema = yup.object().shape({
  userName: yup.string()
    .required(),
  password: yup.string()
    .min(6, 'Too Short! Minimum 6 symbols')
    .required(),
});

//.notOneOf(channels, 'errors.notГnique')
export const schemaForChannel = yup.object().shape({
  name: yup.string()
  .trim()
  //.notOneOf(channels, 'errors.notГnique')
  .required('errors.fieldEmpty')
  .min(3, 'errors.wrongLength')
  .max(20, 'errors.wrongLength'),
});

export default schema;
