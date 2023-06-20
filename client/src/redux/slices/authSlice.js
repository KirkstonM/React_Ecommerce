import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'dark',
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark"
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

    }
});

export const { toggleMode, setLogin, setLogout } = authSlice.actions;
export const loggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;