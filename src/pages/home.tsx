import { logout } from "features/auth/authSlice";
import useNavigation from "hooks/auth/navigation";
import useAuth from "hooks/auth/user";
import { useAppDispatch } from "hooks/store";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { UserType } from "types";
import { isAuthenticated } from "utils/auth";



export async function getServerSideProps (ctx: GetServerSidePropsContext) {
	return  await isAuthenticated(ctx)
};

type PageProps = {
    tokenData: UserType
}

export default function Dashboard(props: PageProps) {
    // console.log(props);
    const auth = useAuth();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    return <div>
        <h1>Welcome {auth.user?.displayName}</h1>
        {router.query['unauthorized'] && <h2>Unauthorized</h2>}
        <button onClick={() => dispatch(logout())}>logOut</button>
        <button onClick={() => router.push('/about')}>About</button>
    </div>
}