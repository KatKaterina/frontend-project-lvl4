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
            //console.log(payload);
            const { type, updateData } = payload;
            console.log('открыли окно ' + type);
            console.log(updateData.name);
            state.type = type;
            state.isOpen = true;
            state.updateData = updateData;
        },
        closeModal: (state) => {
            console.log('закрыли ' + state.type);
            console.log(state.updateData.name);
            state.isOpen = false;
            state.type = '';
            state.updateData = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;