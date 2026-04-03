import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    activityLevel: '',
    sex: '',
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
            state.sex = action.payload.sex;
        },
        resetProfile: (state) => {
            state.name = '';
            state.age = '';
            state.weight = '';
            state.height = '';
            state.goal = '';
            state.activityLevel = '';
            state.sex = '';
        },
    },
});

export const { setProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;