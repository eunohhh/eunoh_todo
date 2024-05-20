import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import Layout from "../components/Layout";
import Home from "../pages/Home";

function Router() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default Router;
