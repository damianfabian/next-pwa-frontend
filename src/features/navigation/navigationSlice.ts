import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";



export type NavigationState = {
    curPath: string | null;
    goTo: string | null;
};

const initialState: NavigationState = {
    curPath: null,
    goTo: null
};

const notificationSlice = createSlice({
    name: 'Navigation',
    initialState,
    reducers: {
        setPath: (state, action: PayloadAction<string>) => {
            state.curPath = action.payload;
        },
        navigateTo: (state, action: PayloadAction<string>) => {
            state.goTo = action.payload;
        },
        navigated: (state) => {
            state.curPath = state.goTo;
            state.goTo = null;
        }
    }
});


export const { setPath, navigateTo, navigated } = notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const navigationSelector = (state: RootState) => state.Navigation

export default notificationSlice.reducer;
