import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { fetch, fetchData, removeChannel } from './ChannelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    fetch
);

const messagesSlice = createSlice ({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, { payload }) => {
            console.log()
            const { message } = payload;
            messagesAdapter.addOne(state, message);
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.fulfilled, (state, action)=> {
              const { messages } = action.payload;
              messagesAdapter.setAll(state, messages);
          })
          .addCase(removeChannel, (state, action) => {
            const { id } = action.payload;
            const rest = Object.values(state.entities).filter((e) => e.channelId !== id);
            //console.log("ent: ");
            //console.log(rest);
            messagesAdapter.setAll(state, rest);
            //messagesAdapter.setAll(state, state.messages.filter(({channelId}) => channelId !== id));
          })
          /*.addCase(fetchMessages.fulfilled, (state, action)=> {
            const { messages } = action.payload;
            messagesAdapter.setAll(state, messages);
        })*/
    },
});

export const { addMessage } = messagesSlice.actions;
export const selectorMessages = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;