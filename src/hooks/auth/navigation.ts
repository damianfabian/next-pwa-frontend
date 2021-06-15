import { navigated, navigateTo, navigationSelector, setPath, NavigationState } from "features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type NavigationHookType = [NavigationState , ((path: string) => void) ]

const useNavigation = (): NavigationHookType => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const blockStore = useAppSelector(navigationSelector);

    useEffect(() => {
        
        if (blockStore.goTo) {
            const goTo = blockStore.goTo;
            dispatch(navigated());
            router.push(goTo);
        } else if (!blockStore.curPath || blockStore.curPath !== router.pathname) {
            dispatch(setPath(router.pathname));
        } 

    }, [blockStore.goTo]);

    const goTo = (path: string) => dispatch(navigateTo(path));

    return [blockStore, goTo];
}

export default useNavigation;
