import React from 'react';
import { Route, Switch} from "react-router-dom";
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



const Layout = () => {

    const [darkMode, setDarkMode] = useDarkMode();

    return(
        <>
            <Header dark={darkMode} setDark={setDarkMode}/>
                
                <main style={{paddingTop: "9rem"}}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/genres" exact component={Genre} />
                        <Route path="/error" exact component={Error} />
                        <Route path="/genres/:genreCode/:page" exact component={GenreRequest} />
                        <Route path="/genres/:genreCode/:page/:id" exact component={MovieDetails} />
                        <Route path="/home/:id" exact component={MovieDetails} />
                        <Route path="/recommendation/:id" exact component={MovieDetails} />
                        <Route path="/:name/:page" exact component={PageTemplate} />
                        <Route path="/:name/:page/:id" exact component={MovieDetails} />
                        <Route path="/search" exact component={Search} />
                        <Route path="/search/:page/:id" exact component={MovieDetails} />
                        <Route component ={Home} />
                    </Switch>
                </main>

            <Footer isDark={darkMode} />
        </>
    )
    
}


export default Layout;

