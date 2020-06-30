import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import MovieCard from "../UI/Utilities/MovieCard/MovieCard";
import axios from "../../axiosInstance";
import classes from "./Recommendation.module.scss";

const Recommendation = ({ id, current, section }) => {
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`/${section}/${id}/recommendations`)
            .then((res) => {
                const recData = res.data.results;
                setRecommendation(recData);
            })
            .catch((err) => {
                setError(err.response.status || "{0}");
            });
    }, [id, section]);

    if (error) {
        return <Redirect to="/error" />;
    }

    if (recommendation && recommendation.length > 1) {
        return (
            <div className={classes.Recommendation}>
                <h2 className={["headingRecommendation", `${classes.Recommendation__Heading}`].join(" ")}>Bacause you viewed {current}</h2>
                <div className={classes.Recommendation__Box}>
                    {recommendation.map(({ title, id, poster_path, vote_average }) => {
                        return <MovieCard key={id} path={`/${section}/recommendation/${id}`} Imgs={poster_path} title={title} rating={vote_average} />;
                    })}
                </div>
            </div>
        );
    }
    if (recommendation && recommendation.length < 1) {
        return null;
    }

    return <p>Loading...</p>;
};

export default Recommendation;
