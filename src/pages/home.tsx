import { logout } from "features/auth/authSlice";
import useAuth from "hooks/auth/user";
import { useAppDispatch } from "hooks/store";
import { useRouter } from "next/router";


export default function Dashboard() {
    const auth = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    if(!auth.isLogin) {
        return <h2>Redirecting...</h2>
    }

    return <div>
        <h1>Welcome {auth.user?.displayName}</h1>
        <button onClick={() => dispatch(logout())}>logOut</button>
    </div>
}