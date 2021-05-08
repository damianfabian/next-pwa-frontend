import { UserType } from 'types';
import { UserActions, UPDATE_USER, INVALID_USER } from './user.actions';

export type UserState =  {
    isValid : Boolean;
    user?: UserType;
    error?: string;
};

const initialState: UserState = {
    isValid: false
};

const userStore = (
    state: UserState = initialState,
    action: UserActions
): UserState => {
    switch (action.type) {
        case UPDATE_USER: {
            const { user } = action;

            return {
                user,
                isValid: true
            };
        }

        case INVALID_USER: {

            return {
                ...state,
                isValid: false,
                error: action.error
            };
        }

        default:
            return state;
    }
};

export default userStore;