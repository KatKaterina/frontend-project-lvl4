import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type: '',
    isOpen: false,
}

const modalSlice = createSlice ({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            console.log('slice ' + payload);
            //const { type } = payload;
            //state.isOpen = true;
            //state.type = type;
        },
        //closeModal: () => initialState,
    },
});

export const { openModal } = modalSlice.actions;
export default modalSlice.reducer;