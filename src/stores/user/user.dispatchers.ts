import { AppThunk } from 'stores';
import { authenticate, getUser } from 'services/userService';
import { updateUser, invalidUser } from './user.actions';
import { UserType } from 'types';

export const loginDispatcher = (username: string, password: string): AppThunk => (
    async dispatch => {
        try {
            const user = await authenticate(username, password);
            if("error" in user) {
                dispatch(invalidUser(user.error!.message));
            } else {
                dispatch(updateUser(user as UserType));
            }
        } catch (e) {
            dispatch(invalidUser('Username does not exist'))
        }
        
    }
);

// search for a redux-form lib?
