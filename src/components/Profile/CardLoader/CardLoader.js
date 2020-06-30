import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { ReactComponent as Watched } from "../../../assets/watched.svg";

import axios from "../../../axiosInstance";

import MovieCard from "../../UI/Utilities/MovieCard/MovieCard";

import classes from "../Profile.module.scss";

const ProfileCardLoader = ({ section, id, watched }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`/${section}/${id}`)
            .then((res) => {
                const data = res.data;
                setData(data);
            })
            .catch((err) => {
                setError(err.response.status || "{0}");
            });
    });

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data) {
        return (
            <div className={classes.CardLoader}>
                <MovieCard path={`/profile/${section}/${id}`} Imgs={data.poster_path} title={section === "movie" ? data.title : data.original_name} rating={data.vote_average} />
                <div className={classes.CardLoader__Watched} style={{ display: `${watched ? "flex" : "none"}` }}>
                    <Watched />
                    <p>Watched</p>
                </div>
            </div>
        );
    }

    return null;
};

export default ProfileCardLoader;
