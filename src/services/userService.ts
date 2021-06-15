import { UserType, ResponseType, FBUser } from '../types'
import db from 'utils/db/client';
import { ENDPOINTS } from 'config';
import axios from 'axios';
import { UserUid } from 'types/user';

export const authenticate = async (email: string, password: string): Promise<ResponseType<FBUser>> => {
    try {
        const response = await db.auth().signInWithEmailAndPassword(email, password);
        return response.user as FBUser;
    } catch(e) {
        return { error: { rawError: new Error('Not Found'), message: 'User not found' } };
    }
    
}

export const register = async (userInfo: UserType): Promise<ResponseType<UserUid>> => {
    try {
        const hasSaved = await axios.post<UserUid>(ENDPOINTS.AUTH.REGISTER, userInfo);
        return hasSaved.data;
    } catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
            return { error: { rawError: new Error('Password is too weak'), message: 'Your password is too weak', code: 'R101' } };
        } else {
            return { error: { rawError: new Error('Firebase Error'), message: errorMessage, code: 'R100' } };
        }
    }
}

export const closeSession = async (): Promise<ResponseType<void>> => {
    try {
        await db.auth().signOut();
    } catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return { error: { rawError: new Error('Firebase Error'), message: errorMessage, code: 'R300' } };
    }
}

export const getUser = async (email: string): Promise<ResponseType<UserType>> => {
    if(false) {
        return { error: { rawError: new Error('Not Found'), message: 'User not found' } };
    } else {
        return { error: { rawError: new Error('Not Found'), message: 'User not found' } };
    }
    
}