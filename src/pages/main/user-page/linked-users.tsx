import {Skeleton} from "@/components/ui/skeleton.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import {IFullProfile} from "@/types/ProfileTypes.ts";
import {FC, ReactElement} from "react";
import ShortUserSkeleton from "@/new_components/shortUserSkeleton.tsx";
import ShortUserItem from "@/new_components/shortUserItem.tsx";

export interface ILinkedUsers {
    loading: boolean;
    linkedUsers: IFullProfile[];
    type: "my" | "another";
    pageData: IFullProfile
    itemsCount: number;
    title: string;
    link: string;
}

const LinkedUsers: FC<ILinkedUsers> = ({loading, linkedUsers, type, pageData, itemsCount, title, link}) => {
    const loadingItems: ReactElement[] = [];
    for (let i = 0; i < itemsCount; i++) {
        loadingItems.push(<ShortUserSkeleton/>);
    }

    const items: ReactElement[] = [];
    for(let i = 0; i < itemsCount && i < linkedUsers.length; i++) {
        items.push(<ShortUserItem data={linkedUsers[i]}/>);
    }

    return (
        <div className={"flex flex-col gap-3"}>
            {loading
                ? <Skeleton className={"w-32 h-[20px]"}/>
                : <ShortNameLink
                    content={`${title} ` + linkedUsers.length} to={
                    type === "my" ? `/my-friends/${link}` : `/friends/${link}/${pageData.id}`
                }/>
            }

            <div className={"flex justify-start items-start gap-1"}>
                {loading
                    ? loadingItems
                    : items}
            </div>
        </div>
    );
};

export default LinkedUsers;