import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "@/store";
import InitializeApp from "@/InitializeApp.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <InitializeApp/>
        </Provider>

    </BrowserRouter>

)
