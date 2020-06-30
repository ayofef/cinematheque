import React from "react";
import { Route, Switch } from "react-router-dom";
import useDarkMode from "../../components/UI/Utilities/DarkModeHooks/UseDarkMode";

import Header from "../../components/UI/Header/Header";
import Footer from "../../components/UI/Footer/Footer";

import Home from "../Home/Home";
import MovieDetails from "../../components/Details/Details";
import PageTemplate from "../../components/Pages/Pages";
import Genre from "../../components/Genre/Genre";
import GenreRequest from "../../components/Genre/GenreRequest/GenreRequest";
import Search from "../../components/Pages/Search";
import Error from "../../components/UI/Utilities/Error/Error";

import SignUp from "../../components/Auth/SignUp/SignUp";
import SignIn from "../../components/Auth/SignIn/SignIn";
import ResetPassword from "../../components/Auth/ResetPassword/ResetPassword";
import Verify from "../../components/Auth/ConfirmEmail/ConfirmEmail";
import Profile from "../../components/Profile/Profile";
import EditProfile from "../../components/Profile/EditProfile/EditProfile";

const Layout = () => {
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <>
            <Header />

            <main style={{ paddingTop: "9rem" }}>
                <Switch>
                    <Route path="/" exact component={Home} />

                    <Route path="/:section/genres" exact component={Genre} />
                    <Route path="/:section/error" exact component={Error} />
                    <Route path="/:section/genres/:genreCode/:page" exact component={GenreRequest} />
                    <Route path="/:section/genres/:genreCode/:page/:id" exact component={MovieDetails} />
                    <Route path="/home/:section/:id" exact component={MovieDetails} />
                    <Route path="/profile/:section/:id" exact component={MovieDetails} />
                    <Route path="/:section/recommendation/:id" exact component={MovieDetails} />
                    <Route path="/:section/:name/:page" exact component={PageTemplate} />
                    <Route path="/:section/:name/:page/:id" exact component={MovieDetails} />

                    <Route path="/search" exact component={Search} />
                    <Route path="/:section/search/:page/:id" exact component={MovieDetails} />

                    <Route path="/sign-up" exact component={SignUp} />
                    <Route path="/sign-in" exact component={SignIn} />
                    <Route path="/reset-password" exact component={ResetPassword} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/profile/edit-profile" exact component={EditProfile} />
                    <Route path="/verify-email" exact component={Verify} />

                    <Route component={Home} />
                </Switch>
            </main>

            <Footer dark={darkMode} setDark={setDarkMode} />
        </>
    );
};

export default Layout;
