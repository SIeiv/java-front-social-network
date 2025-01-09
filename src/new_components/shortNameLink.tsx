import {NavLink} from "react-router";
import {FC} from "react";
import {Label} from "@/components/ui/label.tsx";

interface IShortNameLink {
    content: string;
    to: string;
}

const ShortNameLink: FC<IShortNameLink> = ({content, to}) => {
    return (
        <NavLink to={to} className={"h-[14px]"}>
            <Label className={"cursor-pointer hover:underline h-[14px] flex justify-start"}>{content}</Label>
        </NavLink>
    );
};

export default ShortNameLink;