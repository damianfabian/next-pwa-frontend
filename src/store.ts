import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import notiReducer from 'features/notifications/notificationSlice';

const rootReducer = combineReducers({
    Auth: authReducer,
    Notifications: notiReducer
});

export const initStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type StoreType = typeof store
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store