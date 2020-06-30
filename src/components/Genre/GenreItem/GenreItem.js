import React from "react";
import { Link, useParams } from "react-router-dom";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./GenreItem.module.scss";

const GenreItem = ({ genre, id }) => {
    const { section } = useParams();

    return (
        <Link to={`/${section}/genres/${genre.toLowerCase()}-${id}/1`} className={["genreLink", `${classes.GenreItem}`].join(" ")}>
            <span>
                <FontAwesomeIcon icon={faFilm} />
            </span>
            {genre}
        </Link>
    );
};

export default GenreItem;
