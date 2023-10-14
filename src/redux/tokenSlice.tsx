import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const token = localStorage.getItem('token');
const initialState = token ? JSON.parse(token) : null;

const tokenSlice = createSlice({
    name: "TOKEN",
    initialState,
    reducers: {
        setTokenRed: (state, action) => {
            localStorage.setItem('token', JSON.stringify(action.payload))
            state = action.payload;
            return state;
        }
    }
});

export const { setTokenRed } = tokenSlice.actions;
export const tokenState = (state : RootState) => state.token;
export default tokenSlice.reducer;