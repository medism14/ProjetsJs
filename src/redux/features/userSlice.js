import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: true,
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.isLoggedIn = action.payload;

            if (action.payload == false) {
                state.user = {};
            }

        },
        actualUserSet: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { loggedIn, actualUserSet } = userSlice.actions;

export default userSlice.reducer;