import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {appInitializeAC} from "@/store/auth/actionCreators.ts";
import App from "@/App.tsx";
import Loading from "@/components/ui/loading.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

const InitializeApp = () => {
    const dispatch = useAppDispatch();

    const appInitializeData = useAppSelector(state => state.auth.appInitializeData);

    useEffect(() => {
        dispatch(appInitializeAC());
    }, []);

    return (
        <div className={"w-full h-full"}>
            <Toaster />
            {!appInitializeData.isLoading ? <App /> : <Loading dependence={appInitializeData.isLoading} />}
        </div>
    );
};

export default InitializeApp;