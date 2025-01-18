import {FC} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import {IShortUser} from "@/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";

interface ISearchItemProps {
    data: IShortUser
    onClick?: () => void;
}

const SearchItem: FC<ISearchItemProps> = ({data, onClick}) => {
    return (
        <div >
            <NavLink to={`/user/${data.shortName}`}>
                <Button className={"flex items-center gap-2 rounded-none w-full h-12 p-3 justify-start"}
                        variant={"ghost"} onClick={onClick}>
                    <Avatar className={""}>
                        <AvatarImage src={data.thumbnail}/>
                        <AvatarFallback>{(data.firstName && data.lastName)
                            && data.firstName[0] + data.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className={"flex flex-col gap-1"}>
                        <Label className={"cursor-pointer"}>{data.firstName + " " + data.lastName}</Label>
                        <Label className={"cursor-pointer"}>{"@" + data.shortName}</Label>
                    </div>
                </Button>
            </NavLink>
        </div>
    );
};

export default SearchItem;