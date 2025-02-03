"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {FC} from "react";
import {UserRolesType} from "@/types.ts";

const frameworks = [
    {
        value: "ROLE_USER",
        label: "ROLE_USER",
    },
    {
        value: "ROLE_MODERATOR",
        label: "ROLE_MODERATOR",
    },
    {
        value: "ROLE_ADMIN",
        label: "ROLE_ADMIN",
    },
    {
        value: "ROLE_VISITOR",
        label: "ROLE_VISITOR",
    },

]

interface ICombobox {
    role: UserRolesType
    setEditRole: any
}

export const ComboboxDemo: FC<ICombobox> = ({role, setEditRole}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(role)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Выберите роль"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {/*<CommandInput placeholder="Search framework..." />*/}
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "ROLE_USER" : currentValue as UserRolesType);
                                        setEditRole(currentValue);
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
};