import {NavLink} from "react-router";
import {FC} from "react";
import {Label} from "@/components/ui/label.tsx";

interface IShortNameLink {
    content: string;
    to: string;
    classname?: string;
}

const ShortNameLink: FC<IShortNameLink> = ({content, to, classname}) => {


    return (
        <NavLink to={to} className={""}>
            <Label className={classname + " cursor-pointer hover:underline flex justify-start"}>{content}</Label>
        </NavLink>
    );
};

export default ShortNameLink;