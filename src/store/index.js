import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";

const rootReducer = combineReducers({
    auth: authSlice
});

export const store = configureStore({
    reducer: rootReducer
});