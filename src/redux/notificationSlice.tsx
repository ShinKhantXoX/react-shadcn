import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type NotiMsg = {
    title : string;
    message : string;
    status : number
  }
const initialState : NotiMsg = {
    title : "",
    message : '',
    status : 0
};

const notificationSlice = createSlice({
    name: "NOTIFICATION",
    initialState,
    reducers: {
        updateNotification: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});

export const { updateNotification } = notificationSlice.actions;
export const notificationState = (state : RootState) => state.noti;
export default notificationSlice.reducer;