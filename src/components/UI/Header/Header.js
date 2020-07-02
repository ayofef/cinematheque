import React, { useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import classes from "./Header.module.scss";
import SearchBar from "../Utilities/SearchBar/SearchBar";
import { connect } from "react-redux";

import { faUserAlt, faSignOutAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as actionCreator from "../../../store/actions/authAction";

const moviesNav = [
    { name: "Trending", link: "/movie/trending/1" },
    { name: "Latest", link: "/movie/latest/1" },
    { name: "Top Rated", link: "/movie/top-rated/1" },
    { name: "Popular", link: "/movie/popular/1" },
    { name: "Upcoming", link: "/movie/upcoming/1" },
    { name: "Genres", link: "/movie/genres" },
];

const seriesNav = [
    { name: "Trending", link: "/tv/trending/1" },
    { name: "On Air", link: "/tv/on-the-air/1" },
    { name: "Top Rated", link: "/tv/top-rated/1" },
    { name: "Popular", link: "/tv/popular/1" },
    { name: "Genres", link: "/tv/genres" },
];

const Header = (props) => {
    const [nav, setNav] = useState(false);

    const history = useHistory();
    const id = props.auth.uid;
    const initials = props.profile.initials;

    const SIGN_OUT_AND_REDIRECT = () => {
        history.push("/");
        props.signOut();
    };

    return (
        <header className={classes.Cinematheque}>
            <div className="container">
                <div className={classes.Cinematheque__masthead}>
                    <div className={classes.Cinematheque__logo}>
                        <Link to="/">Cinematheque</Link>
                    </div>

                    <SearchBar />

                    <nav className={[classes.Cinematheque__nav, classes.Cinematheque__nav__Desktop].join(" ")}>
                        <div className={classes.Home}>
                            <NavLink to="/">Home</NavLink>
                        </div>
                        <div>
                            <p>Movies</p>
                            <ul>
                                {moviesNav.map(({ name, link }, id) => {
                                    return (
                                        <li key={id}>
                                            <NavLink to={link || "/"} activeClassName={classes.activeNavLink}>
                                                {name}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div>
                            <p>Tv Series</p>
                            <ul>
                                {seriesNav.map(({ name, link }, id) => {
                                    return (
                                        <li key={id}>
                                            <NavLink to={link || "/"} activeClassName={classes.activeNavLink}>
                                                {name}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        {id ? (
                            <div className={[classes.Cinematheque__Initials, "nav-initials"].join(" ")}>
                                <p>{initials}</p>
                                <ul style={{ padding: "2rem 1rem", marginTop: "1rem" }}>
                                    <li>
                                        <NavLink to="/profile" activeClassName={classes.activeNavLink}>
                                            <span style={{ marginRight: "1rem" }}>
                                                <FontAwesomeIcon icon={faUserAlt} />
                                            </span>
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/user-profile" onClick={SIGN_OUT_AND_REDIRECT} activeClassName={classes.activeNavLink}>
                                            <span style={{ marginRight: "1rem" }}>
                                                <FontAwesomeIcon icon={faSignOutAlt} />
                                            </span>
                                            Sign Out
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <div className={classes.Home}>
                                    <NavLink to="/sign-in">Sign In</NavLink>
                                </div>
                                <div className={classes.Home}>
                                    <NavLink to="/sign-up">Sign Up</NavLink>
                                </div>
                            </>
                        )}
                    </nav>

                    <nav className={[classes.Cinematheque__nav__Mobile].join(" ")}>
                        <input type="checkbox" className={classes.main_navigation__checkbox} id="navi-toggle" checked={nav} readOnly />
                        <label htmlFor="navi-toggle" className={[classes.main_navigation__button, "mobileToggler"].join(" ")} onClick={() => setNav(!nav)}>
                            <span className={classes.main_navigation__hamburger}></span>
                        </label>
                        <div className={[classes.Cinematheque__MobileNav, "mobileNav"].join(" ")} style={{ display: nav ? "block" : "none" }}>
                            <div className={classes.SemiBox}>
                                <div className={classes.Home}>
                                    <NavLink to="/">Home</NavLink>
                                </div>
                                <div className={classes.SECTIONSMOBile}>
                                    <input type="checkbox" id="navi-movies" readOnly />
                                    <label htmlFor="navi-movies">
                                        Movies{" "}
                                        <span>
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </span>
                                    </label>
                                    <ul className={classes.SECTIONSMOBile__SECT}>
                                        {moviesNav.map(({ name, link }, id) => {
                                            return (
                                                <li onClick={() => setNav(!nav)} key={id}>
                                                    <NavLink to={link || "/"} activeClassName={classes.activeNavLink}>
                                                        {name}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className={classes.SECTIONSMOBile}>
                                    <input type="checkbox" id="navi-tv" readOnly />
                                    <label htmlFor="navi-tv">
                                        Tv Series{" "}
                                        <span>
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </span>
                                    </label>
                                    <ul className={classes.SECTIONSMOBile__SECT}>
                                        {moviesNav.map(({ name, link }, id) => {
                                            return (
                                                <li onClick={() => setNav(!nav)} key={id}>
                                                    <NavLink to={link || "/"} activeClassName={classes.activeNavLink}>
                                                        {name}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <ul style={{ display: "inline-block" }}>
                                    {id ? (
                                        <>
                                            <li style={{ marginBottom: "3.5rem" }}>
                                                <NavLink to="/profile" activeClassName={classes.activeNavLink}>
                                                    <span style={{ marginRight: "1rem" }}>
                                                        <FontAwesomeIcon icon={faUserAlt} />
                                                    </span>
                                                    Profile
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/user-profile" onClick={SIGN_OUT_AND_REDIRECT} activeClassName={classes.activeNavLink}>
                                                    <span style={{ marginRight: "1rem" }}>
                                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                                    </span>
                                                    Sign Out
                                                </NavLink>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <div className={classes.Home}>
                                                <NavLink to="/sign-in">Sign In</NavLink>
                                            </div>
                                            <div className={classes.Home}>
                                                <NavLink to="/sign-up">Sign Up</NavLink>
                                            </div>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(actionCreator.signOut()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
