import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import {IShortUser} from "@/types.ts";
import {FC} from "react";
import {NavLink} from "react-router";

interface IShortUserItem {
    data: IShortUser
}

const ShortUserItem: FC<IShortUserItem> = ({data}) => {
    return (
        <NavLink to={`/user/${data.shortName}`} className={"w-20 box-content rounded-md flex flex-col " +
            "p-2 gap-1.5 justify-start hover:bg-slate-100 transition-all duration-100"}>
            <Avatar className={"w-20 h-20"}>
                <AvatarImage src={data.thumbnail}/>
                <AvatarFallback
                    className={"text-3xl"}>{data.shortName && data.shortName[0] + data.shortName[1]}</AvatarFallback>
            </Avatar>
            <Label className={"text-sm w-20 break-all text-center flex justify-center cursor-pointer"}>{data.firstName}</Label>
        </NavLink>
    );
};

export default ShortUserItem;