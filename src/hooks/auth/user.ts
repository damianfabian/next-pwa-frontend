import { authSelector, logout, setUser } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { useEffect } from "react";
import { FBUser } from "types";
import db from "utils/db/client";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authSelector);

    useEffect(() => {
        const unsubscribe = db.auth().onAuthStateChanged(user => {
            
            if (!user && auth.user) {
                console.log("Logging Off");
                dispatch(logout());
            } else if (user && auth.user !== user) {
                console.log("Updating User");
                dispatch(setUser(user as FBUser));
            }
        })

        return unsubscribe;
    }, []);

    return auth;
}

export default useAuth;
