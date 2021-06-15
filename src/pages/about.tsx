import { ROUTE_UNAUTHORIZED } from "config";
import { logout } from "features/auth/authSlice";
import useAuth from "hooks/auth/user";
import { useAppDispatch } from "hooks/store";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { UserType } from "types";
import { isAuthenticated } from "utils/auth";


export async function getServerSideProps (ctx: GetServerSidePropsContext) {
	return await isAuthenticated(ctx, ['admin']);
};

type PageProps = {
    tokenData: UserType
}

export default function Dashboard({ tokenData }: PageProps) {    
    const auth = useAuth();
    const dispatch = useAppDispatch();

    return <div>
        <h1>Welcome {auth.user?.displayName}</h1>
        <button onClick={() => dispatch(logout())}>logOut</button>
    </div>
}