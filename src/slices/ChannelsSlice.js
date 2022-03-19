import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';
import axios from 'axios';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
    currentChannelId: '',
    loading: '',
    error: null,
});

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');
  console.log('token:');
  console.log(token);
  console.log(routes.dataPath());
  return token ? { Authorization: `Bearer ${token}` } : {}
};

export const fetchData = createAsyncThunk(
    'channel/fetchData',
    async () => {
      const {data} = await axios.get(routes.dataPath(), { headers: getAuthorizationHeader() });
      console.log(data);
      return data;
    }
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
          .addCase(fetchData.fulfilled, (state, action)=> {
              const { channels, currentChannelId } = action.payload;
              //channelsAdapter.setAll(state, channels);
              state.channels = channels;
              state.currentChannelId = currentChannelId;
              state.loading = 'succes';
              state.error = null;
          })
          .addCase(fetchData.rejected, (state, action) => {
              state.loading = 'failed';
              state.error = action.error;
          });
    },
});

export const {actions} = channelsSlice;
//export const {selectAll: selectAllChannels, selectorChannels = channelsAdapter.getSelectors((state) => state.channels);
export const { selectAll: selectAllChannels } = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
