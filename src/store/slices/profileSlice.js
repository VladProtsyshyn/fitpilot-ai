import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    age: '',
    weight: '',
    height: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action) {
            state.name = action.payload.name;
            state.age = action.payload.age;
            state.weight = action.payload.weight;
            state.height = action.payload.height;
        },
    },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;

