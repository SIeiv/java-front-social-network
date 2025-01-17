import {Route, Routes} from "react-router";
import Friends from "@/pages/main/friends.tsx";

const RouterFriends = () => {
    return (
        <div>
            <Routes>
                <Route path="friends" element={<Friends type={"my"} category={"friends"}/>}/>
                <Route path="subscribers" element={<Friends type={"my"} category={"subscribers"}/>}/>
                <Route path="subscriptions" element={<Friends type={"my"} category={"subscriptions"}/>}/>

                <Route path="friends/*" element={<Friends type={"another"} category={"friends"}/>}/>
                <Route path="subscribers/*" element={<Friends type={"another"} category={"subscribers"}/>}/>
                <Route path="subscriptions/*" element={<Friends type={"another"} category={"subscriptions"}/>}/>
            </Routes>
        </div>
    );
};

export default RouterFriends;