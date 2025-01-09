import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FC, LegacyRef} from "react";

interface AuthInputProps {
    title: string;
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
    ref?: LegacyRef<HTMLInputElement>;
    type?: string
}

const AuthInput: FC<AuthInputProps> = ({title, placeholder, value, onChange, type, ref}) => {
    return (
        <div>
            <Label className={"text-sm font-medium text-slate-900"}>{title}</Label>
            <Input type={type} ref={ref} className={"w-96 h-10 text-xl mt-1.5"} placeholder={placeholder} value={value} onChange={(e) => {onChange!(e.target.value)}}/>
        </div>
    );
};

export default AuthInput;