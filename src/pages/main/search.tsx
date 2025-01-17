import {Label} from "@/components/ui/label.tsx";
import {useLocation, useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {useEffect, useState} from "react";
import {searchAC} from "@/store/search/actionCreators.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import FriendItem from "@/new_components/friendItem.tsx";

const Search = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const searchRequest = pathname.split("/").pop();

    const dispatch = useAppDispatch();
    const searchData = useAppSelector((state) => state.search.searchData);
    const searchField = useAppSelector((state) => state.search.field);

    const [searchInput, setSearchInput] = useState<string>(searchField);

    useEffect(() => {
        if (searchRequest) {
            dispatch(searchAC({search: searchInput}));
        }
    }, []);

    const searchEls = searchData.map((item) => <FriendItem friendData={item}/>)

    return (
        <div className={"flex gap-3"}>
            <div className={"w-[600px] box-border flex flex-col gap-3"}>
                <div className={"flex flex-col justify-center rounded-lg bg-white items-start p-3 gap-6 box-border"}>
                    <div className={"w-full"}>
                        <Label className={"text-base"}>Поиск</Label>
                        <div className={"w-full flex"}>
                            <Input placeholder={"Введите запрос"} value={searchInput}
                                   onChange={(e) => {setSearchInput(e.target.value)}}></Input>
                            <Button onClick={() => {
                                dispatch(searchAC({search: searchInput}))
                                navigate(`/search/${searchInput}`);
                            }}>Поиск</Button>
                        </div>
                    </div>
                    <Label>Результаты поиска ({searchData.length})</Label>
                    <div className={"flex flex-col gap-4"}>
                        {searchEls}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Search;