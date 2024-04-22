import { createSlice } from '@reduxjs/toolkit';
import { Accordion } from 'flowbite-react';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    auth_token: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            state.auth_token = action.payload.accessToken;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
            state.auth_token = null
            state.error = null;
            state.loading = false;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;