import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInPage from "../pages/sign_in";
import SignUpPage from "../pages/sign_up";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={< SignInPage/>} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/Home" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>

            </div>

        )
    }
}

export default AppRouter;