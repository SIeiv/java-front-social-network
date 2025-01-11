import {FC, ReactElement} from 'react';
import {NavLink} from "react-router";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";

interface ISidebarButton {
    to: string;
    text: string;
    image: ReactElement
}

const SidebarButton: FC<ISidebarButton> = ({to, text, image}) => {
    return (
        <div className={"w-full"}>
            <NavLink to={to} className={"w-full"}>
                <Button variant={"ghost"} className={"w-full justify-start"}>
                    {image}
                    <Label className={"cursor-pointer"}>{text}</Label>
                </Button>
            </NavLink>
        </div>
    );
};

export default SidebarButton;