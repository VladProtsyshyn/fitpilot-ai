import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setName(state, action) {
        state.name = action.payload;
        },
    },
});

export const { setName } = profileSlice.actions;
export default profileSlice.reducer;
