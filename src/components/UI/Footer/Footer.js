import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.scss";
import TMDB from "../../../assets/tmdb.svg";
import FDEV from "../../../assets/logo.svg";
import FDEVDark from "../../../assets/logo_dark.svg";

import Toggler from "./DarkModeToggler/DarkModeToggler";

const Footer = ({ dark, setDark }) => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={classes.Footer}>
      <div className="container">
        <div className={classes.Footer__Logo}>
          <Link to="/">Cinematheque</Link>
        </div>

        <div className={classes.Footer__Credits}>
          <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
            <img src={TMDB} alt="Powered by the movie database" />
          </a>
          <a href="https://farouq.dev" target="_blank" rel="noopener noreferrer">
            <img src={dark ? FDEV : FDEVDark} alt="Powered by the movie database" />
          </a>
        </div>

        <Toggler clicked={() => setDark(!dark)} dark={dark} />
        <p style={{ textAlign: "center" }}> &copy; {year}</p>
      </div>
    </footer>
  );
};

export default Footer;
