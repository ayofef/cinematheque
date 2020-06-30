import React from "react";
import { Link } from "react-router-dom";
import { Img, NoImg } from "../Images";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

import classes from "./MovieCard.module.scss";

const MovieCard = ({ path, Imgs, title, rating }) => {
    const parsedRating = (rating / 10) * 100;

    return (
        <Link to={path} className={classes.section__Link}>
            <div className={classes.section__Image}>{Imgs ? <Img style={classes.section__Image___Img} id={Imgs} title={title} /> : <NoImg style={classes.section__Image___Img} id={Imgs} title={title} />}</div>
            <div className={classes.section___Rating}>
                <CircularProgressbarWithChildren
                    value={parsedRating}
                    styles={buildStyles({
                        textSize: "16px",
                        pathColor: "#3c3d4c",
                        trailColor: "#cfdbd5",
                    })}
                >
                    <div style={{ fontSize: 12, color: "#3c3d4c" }}>{rating}</div>
                </CircularProgressbarWithChildren>
            </div>
        </Link>
    );
};

export default MovieCard;
