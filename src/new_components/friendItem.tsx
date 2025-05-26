import {FC} from 'react';
import {IShortUser} from "@/types.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import {IFullProfile} from "@/types/ProfileTypes.ts";

interface IFriendItem {
    friendData: IFullProfile
}

const FriendItem: FC<IFriendItem> = ({friendData}) => {
    return (
        <div className="flex items-center w-full gap-2">
            <div>
                <Avatar className={"w-20 h-20"}>
                    <AvatarImage src={friendData.avatarPath} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col justify-center">
                <Label className={"text-base"}>{friendData.firstName + " " + friendData.lastName}</Label>
                <ShortNameLink classname={"text-base"}
                               content={"@" + friendData.shortName} to={"/user/" + friendData.id}/>
            </div>
        </div>
    );
};

export default FriendItem;