import React, { useState} from 'react';
import { NavLink, Link } from "react-router-dom";
import classes from "./Header.module.scss";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from "../Utilities/SearchBar/SearchBar";

const mainNav = [ 
    {name: "Latest", link: "/latest-movies/1"}, 
    {name: "Top Rated", link: "/top-rated-movies/1"}, 
    {name: "Popular", link: "/popular-movies/1"},
    {name: "Upcoming", link: "/upcoming-movies/1"}, 
    {name: "Genres",  link: "/genres"}
];


const IconStyle = {
    height: "4rem",
};

const Header = ({dark, setDark}) => {

    const [nav, setNav] = useState(false);
    

    return (
        <header className={classes.Cinematheque}>
            <div className="container">
                <div className={classes.Cinematheque__masthead}>
                    <div className={classes.Cinematheque__logo}>
                        <Link to="/">Cinematheque</Link>
                    </div>

                    <SearchBar/>
                    
                    <nav className={[classes.Cinematheque__nav, classes.Cinematheque__nav__Desktop].join(" ")}>
                        <ul>
                            {
                                mainNav.map(({name, link}, id) => {

                                    return(
                                        <li key={id}><NavLink to={link || "/"} activeClassName={classes.activeNavLink}>{name}</NavLink></li>
                                    )
                                })
                            }
                            <li onClick={() => setDark(!dark)}><FontAwesomeIcon style={IconStyle} icon={ !dark ? faMoon : faSun }/></li>
                        </ul>
                    </nav>

                    <nav className={[classes.Cinematheque__nav, classes.Cinematheque__nav__Mobile].join(" ")} >
                        <input type="checkbox" className={classes.main_navigation__checkbox} id="navi-toggle" checked={nav} readOnly/>
                        <label htmlFor="navi-toggle" className={[classes.main_navigation__button, "mobileToggler"].join(" ")} onClick={() => setNav(!nav)}>
                            <span className={classes.main_navigation__hamburger}></span>
                        </label>
                        <div className={[classes.Cinematheque__MobileNav, "mobileNav"].join(" ")} style={{display: nav ? "block" : "none"}}>
                            <ul>
                                {
                                    mainNav.map(({name, link}, id) => {

                                        return(
                                            <li onClick={() => setNav(!nav)} key={id}><NavLink to={link || "/"} activeClassName={classes.activeNavLink}>{name}</NavLink></li>
                                        )
                                    })
                                }
                                <li onClick={() => setDark(!dark)}>{!dark ? "Dark Mode" : "Light Mode" } <FontAwesomeIcon style={{transform: "translate(.5rem, 0rem)"}} icon={ !dark ? faMoon : faSun }/></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}


export default Header;