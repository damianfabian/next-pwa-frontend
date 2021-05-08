import { UserType } from "types";

export const UPDATE_USER = 'UPDATE_USER';
export const INVALID_USER = 'INVALID_USER';
export interface UpdateUserAction {
    type: typeof UPDATE_USER,
    user: UserType
}
export interface InvalidUserAction {
    type: typeof INVALID_USER,
    error: string  
}

export type UserActions = UpdateUserAction | InvalidUserAction;

export const updateUser = (user: UserType): UpdateUserAction => ({
    type: UPDATE_USER,
    user
});

export const invalidUser = (error: string): InvalidUserAction => ({
    type: INVALID_USER,
    error 
});
