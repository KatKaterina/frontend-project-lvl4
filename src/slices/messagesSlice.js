import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { fetch, fetchData } from './ChannelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

export const fetchMessages = createAsyncThunk(
    'channel/fetchMessages',
    fetch
);

const messagesSlice = createSlice ({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, { payload }) => {
            const {message} = payload;
            messagesAdapter.addOne(state, message);
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.fulfilled, (state, action)=> {
              const { messages } = action.payload;
              messagesAdapter.setAll(state, messages);
          })
          .addCase(fetchMessages.fulfilled, (state, action)=> {
            const { messages } = action.payload;
            messagesAdapter.setAll(state, messages);
        })
    },
});

export const { addMessage } = messagesSlice.actions;
export const selectorMessages = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;