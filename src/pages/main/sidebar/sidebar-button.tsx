import {FC} from 'react';
import {NavLink} from "react-router";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";

interface ISidebarButton {
    to: string;
    text: string;
}

const SidebarButton: FC<ISidebarButton> = ({to, text}) => {
    return (
        <div className={"w-full"}>
            <NavLink to={to} className={"w-full"}>
                <Button variant={"ghost"} className={"w-full justify-start"}>
                    <img src="" alt=""/>
                    <Label className={""}>{text}</Label>
                </Button>
            </NavLink>
        </div>
    );
};

export default SidebarButton;