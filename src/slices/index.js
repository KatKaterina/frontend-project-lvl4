import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './ChannelsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
  },
});
