"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {FC} from "react";

interface DatePickerProps {
    initialDate: Date;
    initialTimeSetter: any;
}

export const DatePicker: FC<DatePickerProps> = ({initialDate, initialTimeSetter}) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
        <Button
            variant={"outline"}
    className={cn(
        "w-[280px] justify-start text-left font-normal",
    !initialDate && "text-muted-foreground"
)}
>
    <CalendarIcon className="mr-2 h-4 w-4" />
        {initialDate ? format(initialDate, "PPP") : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
            <Calendar
                mode="single"
            selected={initialDate}
            onSelect={initialTimeSetter}
            initialFocus
        />
        </PopoverContent>
        </Popover>
)
};