import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    activityLevel: '',
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
        state.goal = action.payload.goal;
        state.activityLevel = action.payload.activityLevel;
        },
    },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;