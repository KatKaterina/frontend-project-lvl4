import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';
import axios from 'axios';
import _ from 'lodash';
import { addMessage } from './messagesSlice.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
    defaultChannelId: '',
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
        addChannel: (state, { payload }) => {
            const { channel } = payload;
            channelsAdapter.addOne(state, channel);
            state.currentChannelId = channel.id;
        },
        renameChannel: (state, { payload }) => {
            const { id } = payload;
            channelsAdapter.updateOne;
            //state.currentChannelId = id;
        },
        removeChannel: (state, { payload }) => {
            const { id } = payload;
            channelsAdapter.removeOne;
            if (id === state.currentChannelId) {
                state.currentChannelId = state.defaultChannelId;
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.fulfilled, (state, action)=> {
              const { channels, currentChannelId } = action.payload;
              //console.log('до ' + state.currentChannelId);
              //console.log(state.currentChannelId);
              channelsAdapter.setAll(state, channels);
              state.currentChannelId = state.currentChannelId === undefined ? currentChannelId : state.currentChannelId;
              state.defaultChannelId = _.first(channels).id;
              //console.log('после ' + state.currentChannelId);
              state.loading = 'succes';
              state.error = null;
          })
          .addCase(fetchData.rejected, (state, action) => {
              state.loading = 'failed';
              state.error = action.error;
          });
    },
});

export const {changeCurrentChannel, addChannel, renameChannel, removeChannel} = channelsSlice.actions;
export const selectorChannels = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
