import {Button} from "@/components/ui/button.tsx";
import {FC, ReactElement} from "react";

interface RegisterUserPermissionProps {
    items: Array<string>;
    activeButton: number;
    setActiveButton: (active: number) => void;
}

const FillProfileGender: FC<RegisterUserPermissionProps> = ({items, activeButton, setActiveButton}) => {

    const arrayOfButtons: Array<ReactElement> = items.map((item, index) => {
            if (activeButton === index) {
                return <Button variant={"ghost"} className={"bg-white border-transparent hover:bg-white"}>{item}</Button>
            } else {
                return <Button onClick={() => {setActiveButton(index)}} variant={"ghost"} className={"bg-transparent border-transparent hover:bg-transparent"}>{item}</Button>
            }
        }
    )

    return (
        <div>
            Выберите пол
            <div className={"p-[5px] bg-slate-100 rounded-md mt-1.5"}>
                {arrayOfButtons}
            </div>
        </div>
    );
};

export default FillProfileGender;