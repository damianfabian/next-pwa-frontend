import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNotification } from 'features/notifications/notificationSlice';
import { authenticate, closeSession, register, updateProfile } from 'services/userService';
import { AppThunk, RootState } from 'store';
import { ErrorType, FBUser, UserType } from 'types';
import nookies from 'nookies';

export type UserState = {
    isLogin: Boolean;
    user?: FBUser;
    error?: string;
};

const initialState: UserState = {
    isLogin: false
};

export const counterSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<FBUser>) => {
            const { payload } = action;
            state.user = payload;
            state.isLogin = true;
        },
        update: (state, action: PayloadAction<FBUser>) => {
            const { payload } = action;
            state.user = payload;
        },
        logoff: (state) => {
            state.user = undefined;
            state.isLogin = false;
        },
        onError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

/****** Dispatchers */
export const login = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        const user = await authenticate(email, password);
        if ("error" in user) {
            dispatch(onError(user.error!.message));
            dispatch(addNotification({ message: user.error!.message, isExpirable: true }));
        } else {
            const tempUser = user as FBUser;
            tempUser.getIdToken().then(token => {
                nookies.set(undefined, 'token', token, { path: '/'});
            }); 
            
            dispatch(setUser(tempUser));
        }
    } catch (e) {
        const message = 'Email does not exist';
        dispatch(onError(message));
        dispatch(addNotification({ message, isExpirable: true }));
    }
}

export const singUp = (userInfo: UserType): AppThunk => async (dispatch) => {
    try {
        const user = await register(userInfo);
        if ("error" in user) {
            dispatch(onError(user.error!.message));
            dispatch(addNotification({ message: user.error!.message, isExpirable: true, type: 'warning' }));
        } else {
            const newUser = user as FBUser;
            updateProfile(newUser, userInfo.name).catch(er => {
                console.log("Error updating name", er);
                dispatch(addNotification({ message: er.error!.message, isExpirable: true, type: 'error' }));
            });
        }
    } catch (e) {
        const message = 'Email does not exist';
        dispatch(onError(message));
        dispatch(addNotification({ message, isExpirable: true }));
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    try {
        const res = await closeSession();
        nookies.set(undefined, 'token', '', { path: '/'});
        dispatch(logoff());
    } catch (e) {
        const message = 'Error login out';
        dispatch(addNotification({ message, isExpirable: true }));
    }
}
/****** End Dispatchers */

export const { update, onError, setUser, logoff } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const authSelector = (state: RootState) => state.Auth

export default counterSlice.reducer;
