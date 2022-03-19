import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';
import axios from 'axios';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
    currentChannelsId: '',
    loading: '',
    error: null,
});

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {}
};

export const fetchData = createAsyncThunk(
    'channel/fetchData',
    async () => {
      const {data} = await axios.get(routes.dataPath(), { headers: getAuthorizationHeader() });
      return data;
    }
);

const channelsSlice = createSlice ({
    name: "channels",
    initialState,
    reducers: {
        changeCurrentChannel: (state, { payload }) => {
            const {id} = payload;
            state.currentChannelsId = id;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.fulfilled, (state, action)=> {
              const { channels, currentChannelsId } = action.payload;
              channelsAdapter.setAll(state, channels);
              state.currentChannelsId = currentChannelsId;
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
export const selectorChannels = channelsAdapter.getSelectors((state) => state.channels);
export default channelsAdapter.reducer;
