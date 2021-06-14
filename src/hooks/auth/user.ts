import { authSelector, logout, setUser } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FBUser } from "types";
import { REDIRECT_ROUTE_UNAUTHENTICATED } from "config";
import db from "utils/db/client";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const auth = useAppSelector(authSelector);

    useEffect(() => {
        const unsubscribe = db.auth().onAuthStateChanged(user => {
            if(!user && auth.user) {
                dispatch(logout());
                router.push(REDIRECT_ROUTE_UNAUTHENTICATED);
            } else if(user && auth.user !== user) {
                dispatch(setUser(user as FBUser));
            }
        })

        return unsubscribe;
    }, []);

    return auth;
}

export default useAuth;