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
            console.log(payload);
            const { type } = payload;
            state.isOpen = true;
            state.type = type;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.type = '';
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;