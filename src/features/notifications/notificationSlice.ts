import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification, NotificationId } from "components/notification";
import { RootState } from "store";



type NotificationsState = {
    [key in NotificationId]: INotification
};

const initialState: NotificationsState = {};

const notificationSlice = createSlice({
    name: 'Notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<INotification>) => {
            state[Date.now()] = action.payload;
        },
        removeNotification: (state, action: PayloadAction<number>) => {
            delete state[action.payload];
        }
    }
});


export const { addNotification, removeNotification } = notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const notiSelector = (state: RootState) => state.Notifications

export default notificationSlice.reducer;
