import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type: null,
    isOpen: false,
}

const modalSlice = createSlice ({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            const { type } = payload;
            state.isOpen = true;
            state.type = type;
        },
        closeModal: () => initialState,
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;