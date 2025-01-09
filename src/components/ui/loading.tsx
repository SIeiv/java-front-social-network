import {FC} from 'react';
import {AlertDialog, AlertDialogContent} from "@/components/ui/alert-dialog.tsx";
import loadingGif from "@/assets/bouncing-circles.svg";

interface ILoadingProps {
    dependence: boolean
}

const Loading: FC<ILoadingProps> = ({dependence}) => {
    return (
        <AlertDialog open={dependence}>
            <AlertDialogContent className={"w-20 h-20 p-1"}>
                <img src={loadingGif} alt=""/>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Loading;