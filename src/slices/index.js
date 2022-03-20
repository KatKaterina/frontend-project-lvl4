import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './ChannelsSlice.js';
import messagesReducer from './messagesSlice.js'

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
