import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {appInitializeAC} from "@/store/auth/actionCreators.ts";
import App from "@/App.tsx";
import Loading from "@/components/ui/loading.tsx";

const InitializeApp = () => {
    const dispatch = useAppDispatch();

    const appInitializeData = useAppSelector(state => state.auth.appInitializeData);

    useEffect(() => {
        if (!appInitializeData.initialized) {
            dispatch(appInitializeAC());
        }
    }, []);

    return (
        <div className={"w-full h-full"}>
            {appInitializeData.initialized ? <App /> : <Loading dependence={!appInitializeData.initialized} />}
        </div>
    );
};

export default InitializeApp;