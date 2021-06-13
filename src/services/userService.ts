import { UserType, ResponseType, FBUser } from '../types'
import db from 'utils/db/client';

export const authenticate = async (email: string, password: string): Promise<ResponseType<FBUser>> => {
    try {
        const response = await db.auth().signInWithEmailAndPassword(email, password);
        return response.user as FBUser;
    } catch(e) {
        return { error: { rawError: new Error('Not Found'), message: 'User not found' } };
    }
    
}

export const register = async (userInfo: UserType): Promise<ResponseType<FBUser>> => {
    try {
        const hasSaved = await db.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password);
        return hasSaved.user!;
    } catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode == 'auth/weak-password') {
            return { error: { rawError: new Error('Password is too weak'), message: 'Your password is too weak', code: 'R101' } };
        } else {
            return { error: { rawError: new Error('Firebase Error'), message: errorMessage, code: 'R100' } };
        }
    }
}

export const updateProfile = async (user: FBUser, name: string ): Promise<ResponseType<void>> => {
    try {
        console.log("Updating name", name);
        await user.updateProfile({ displayName: name }) ;
    } catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage, error.code);
        console.log("Error Updating name", error);
        return { error: { rawError: new Error('Firebase Error'), message: errorMessage, code: 'R200' } };
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