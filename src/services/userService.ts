import { UserType, ResponseType } from '../types'

export const authenticate = async (user: string, password: string): Promise<ResponseType<UserType>> => {
    if(user === 'damianfabian' && password === '123456') {
        return {
            name: 'Fabian',
            id: '88',
            age: 33,
            phone: '+3165854547',
            username: 'damianfabian'
        }
    } else {
        return { error: { rawError: new Error('Not Found'), message: 'User not found' } };
    }
    
}

export const getUser = async (user: string): Promise<ResponseType<UserType>> => {
    if(user === 'damianfabian') {
        return {
            name: 'Fabian',
            id: 'damianfabian'
        }
    } else {
        return { error: { rawError: new Error('Not Found'), message: 'User not found' } };
    }
    
}