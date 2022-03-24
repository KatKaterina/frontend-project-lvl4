import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type: '',
    isOpen: false,
    updateData: null,
}

const modalSlice = createSlice ({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            console.log(payload);
            const { type, updateData } = payload;
            state.type = type;
            state.isOpen = true;
            state.updateData = updateData;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.type = '';
            state.updateData = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;