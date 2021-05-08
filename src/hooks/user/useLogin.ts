import { useEffect } from 'react';
import { loginDispatcher } from 'stores/user';
import { UserState } from 'stores/user/user.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';

export const useLogin = (username: string, password: string): UserState => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.user);
    
    useEffect(() => {
        if (!data.isValid) {
            dispatch(loginDispatcher(username, password));
        }
    }, []);

    return data;
};

