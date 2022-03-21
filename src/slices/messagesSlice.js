import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from './ChannelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

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
              const { messages, currentChannelId } = action.payload;
              messagesAdapter.setAll(state, messages);
              state.currentChannelId = currentChannelId;
          })
    },
});

export const { addMessage } = messagesSlice.actions;
export const selectorMessages = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;