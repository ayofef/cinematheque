import React from "react";
import classes from "./Markup.module.scss";
import MovieCard from "../UI/Utilities/MovieCard/MovieCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SectionMarkup = ({ data, heading, children, path, section }) => {
    const IconStyle = {
        height: "2.5rem",
        marginLeft: "1rem",
    };

    return (
        <div className={classes.Home_section}>
            <div className="container">
                <Link to={path}>
                    <h2 className={["markupHeading", `${classes.section__Heading}`].join(" ")}>
                        {children}
                        {heading}
                        <span>
                            <i className={classes.section__Heading_explore}>Explore all</i>
                            <div className={classes.section__Heading_arrow}>
                                <FontAwesomeIcon style={IconStyle} icon={faArrowRight} />
                            </div>
                        </span>
                    </h2>
                </Link>
            </div>
            <div className={classes.section__box}>
                {data.map(({ title, id, poster_path, vote_average }) => {
                    return <MovieCard key={id} path={`/home/${section}/${id}`} Imgs={poster_path} title={title} rating={vote_average} />;
                })}
            </div>
        </div>
    );
};

export default SectionMarkup;
