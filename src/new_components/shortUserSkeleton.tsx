import {Skeleton} from "@/components/ui/skeleton.tsx";


const ShortUserSkeleton = () => {
    return (
        <div className={"w-20 box-content rounded-md flex flex-col p-2 gap-1.5 justify-start"}>
            <Skeleton className={"w-20 h-20 rounded-full"}/>
            <Skeleton className={"w-20 h-5"}/>
        </div>
    );
};

export default ShortUserSkeleton;