import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        error: '',
        user: null
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        loginUserSuccess(state, action) {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
        },
        loginUserLoading(state) {
            state.isLoading = true;
        },
        loginUserError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default authSlice.reducer;

export const {setUser, loginUserError, loginUserLoading, loginUserSuccess} = authSlice.actions;