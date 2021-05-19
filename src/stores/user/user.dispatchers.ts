import { AppThunk } from 'stores';
import { authenticate, getUser } from 'services/userService';
import { updateUser, invalidUser } from './user.actions';
import { UserType } from 'types';
import { addNotification } from 'stores/notifications';

export const loginDispatcher = (username: string, password: string): AppThunk => (
    async dispatch => {
        try {
            const user = await authenticate(username, password);
            if("error" in user) {
                dispatch(invalidUser(user.error!.message));
                dispatch(addNotification({ message: user.error!.message, isExpirable: true }));
            } else {
                dispatch(updateUser(user as UserType));
            }
        } catch (e) {
            const message = 'Username does not exist';
            dispatch(invalidUser(message));
            dispatch(addNotification({ message, isExpirable: true }));
        }
        
    }
);

// search for a redux-form lib?
