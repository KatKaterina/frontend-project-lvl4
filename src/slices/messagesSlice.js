/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { fetch, fetchData, removeChannel } from './ChannelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  messages: [],
});

export const fetchMessages = createAsyncThunk('messages/fetchMessages', fetch);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      const { message } = payload;
      state.messages = [...state.messages, message];
      // messagesAdapter.addOne(state, message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.messages = [...messages];
        // messagesAdapter.setAll(state, messages);
      })
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;
        // const rest = Object.values(state.entities).filter((e) => e.channelId !== id);
        // messagesAdapter.setAll(state, rest);
        state.messages = state.messages.filter((message) => message.channelId !== id);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectorMessages = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
