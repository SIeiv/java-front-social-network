import {FC, useRef, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {updateAvatarAC} from "@/store/profile/actionCreators.ts";
import {IDetailsResponse} from "@/api/auth/types.ts";

interface IFormAvatar {
    state: boolean;
    setState: (state: boolean) => void;
}

const FormAvatar: FC<IFormAvatar> = ({setState, state}) => {
    const dispatch = useAppDispatch();

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [imageBase64, setImageBase64] = useState("");

    const user: IDetailsResponse = useAppSelector(state => state.auth.appInitializeData.initialUserData)

    const handleCreatePostSubmit = () => {
        dispatch(updateAvatarAC(imageInputRef.current!.files!, imageBase64, user.profileId));
        setState(false);
        setImageBase64("");
    }

    const onImageInputChange = () => {
        const reader = new FileReader();
        reader.readAsDataURL(imageInputRef.current!.files![0]);
        reader.onload = function () {
            setImageBase64(reader.result!.toString());
        };
    }

    return (
        <div>
            <Dialog open={state} onOpenChange={() => {
                setState(false);
                setImageBase64("");
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Изменить аватарку</DialogTitle>
                        <DialogDescription>
                            <div className={"flex flex-col gap-3 mt-3"}>
                                <Input type={"file"} ref={imageInputRef} onChange={onImageInputChange}/>
                                {imageBase64 !== "" && <img className={"rounded-md"} src={imageBase64} alt=""/>}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleCreatePostSubmit}>Изменить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FormAvatar;