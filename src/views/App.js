import '../styles.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./Login/Login";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";


export const App = () => {
    return (
        <div className={'app-container'}>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Login/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    )
}
