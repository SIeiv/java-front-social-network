import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FC, useRef, useState} from "react";
import {ICreatePostRequest, IEditPostRequest} from "@/api/posts/types.ts";
import {IPost} from "@/types.ts";
import {createPostAC, editPostAC} from "@/store/profile/actionCreators.ts";
import {useAppDispatch} from "@/hooks.ts";
import {Input} from "@/components/ui/input.tsx";

interface IFormPost {
    state: boolean;
    setState: (state: boolean) => void;
    profileId: number | null;
    thumbnail: string | null;
    type: "add" | "edit";
    prevPostContent?: string | null;
    postId?: number | null;
    place: string;
}

const FormPost: FC<IFormPost> = ({setState, state, profileId, thumbnail, type, prevPostContent, postId, place}) => {
    const dispatch = useAppDispatch();

    console.log("FormPost: ", place)

    const [postContent, setPostContent] = useState(prevPostContent ? prevPostContent : "");
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [imageBase64, setImageBase64] = useState("");

    const handleCreatePostSubmit = () => {
        const data: ICreatePostRequest = {
            image: imageBase64.replace("data:image/jpeg;base64,", ""),
            profileId: profileId,
            content: postContent
        }

        const data2: IPost = {
            "id": 0,
            "profileId": profileId,
            "publicationDate": new Date().toISOString(),
            "authorImage": thumbnail,
            "image": imageBase64,
            "content": postContent,
            "likes": [],
            "likesCount": 0,
            "commentsCount": 0,
            "comments": [],
            firstName: "",
            lastName: "",
            shortName: ""
        }

        dispatch(createPostAC(data, data2));
        setState(false);
        setImageBase64("");
        setPostContent("");
    }

    const handleEditPostSubmit = () => {
        const data: IEditPostRequest = {
            image: imageBase64 === "" ? null : imageBase64,
            profileId: profileId!,
            content: postContent,
            postId: postId!
        }

        dispatch(editPostAC(data, place));
        setState(false);
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
                setPostContent("");
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{type === "add" ? "Создать" : "Изменить"} пост</DialogTitle>
                        <DialogDescription>
                            <div className={"flex flex-col gap-3 mt-3"}>
                                <Input type={"file"} ref={imageInputRef} onChange={onImageInputChange}/>
                                {imageBase64 !== "" && <img className={"rounded-md"} src={imageBase64} alt=""/>}
                                <Textarea value={postContent} onChange={(e) => {
                                    setPostContent(e.target.value)
                                }}
                                          placeholder={"Напишите что нибудь..."}></Textarea>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        {type === "add"
                            ? <Button onClick={handleCreatePostSubmit}>Создать</Button>
                            : <Button onClick={handleEditPostSubmit}>Изменить</Button>
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FormPost;