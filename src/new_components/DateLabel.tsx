import {FC} from "react";
import {Label} from "@/components/ui/label.tsx";

interface IDate {
    date: string;
}

const DateLabel: FC<IDate> = ({date}) => {

    let options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
    };
    const dat: string = new Date(date).toLocaleString("ru", options);

    return (
        <Label className={"text-slate-400"}>{dat.toString()}</Label>
    );
};

export default DateLabel;