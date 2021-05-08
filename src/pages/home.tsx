import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux"
import { RootState } from "stores";

export default function Dashboard() {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    if(!user.isValid) {
        router.push('/login');
    }

    return <div>
        <p>{JSON.stringify(user, null, 2)}</p>
    </div>
}