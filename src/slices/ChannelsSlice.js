import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';
import axios from 'axios';
import { addMessage } from './messagesSlice.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
    //currentChannelId: '',
    loading: '',
    error: null,
});

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {}
};

export const fetch = async () => {
    const {data} = await axios.get(routes.dataPath(), { headers: getAuthorizationHeader() });
    return data;
};

export const fetchData = createAsyncThunk(
    'channels/fetchData',
    fetch
    /*async () => {
      const {data} = await axios.get(routes.dataPath(), { headers: getAuthorizationHeader() });
      //console.log(data);
      return data;
    }*/
);

const channelsSlice = createSlice ({
    name: 'channels',
    initialState,
    reducers: {
        changeCurrentChannel: (state, { payload }) => {
            const {id} = payload;
            state.currentChannelId = id;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(addMessage, (state, { payload }) => {
              const {message} = payload;
              console.log(message);
            //console.log('add ' + message.channelId);
            //state.currentChannelId = message.channelId;
          })
          .addCase(fetchData.fulfilled, (state, action)=> {
              const { channels, currentChannelId } = action.payload;
              console.log('до ' + state.currentChannelId);
              //console.log(state.currentChannelId);
              channelsAdapter.setAll(state, channels);
              state.currentChannelId = currentChannelId;
              console.log('после ' + state.currentChannelId);
              state.loading = 'succes';
              state.error = null;
          })
          .addCase(fetchData.rejected, (state, action) => {
              state.loading = 'failed';
              state.error = action.error;
          });
    },
});

export const {changeCurrentChannel} = channelsSlice.actions;
export const selectorChannels = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
