import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import { useLocation, Redirect } from "react-router-dom";
import MovieCard from "../UI/Utilities/MovieCard/MovieCard";

import Loader from "../UI/Utilities/Loader/Loader";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Pages.module.scss";

import NoResult from "../UI/Utilities/Error/NoResult";

const Search = (props) => {
    const [moviedata, setMovieData] = useState(null);
    const [tvdata, setTvData] = useState(null);
    const [error, setError] = useState(null);

    const { search } = useLocation();

    const query = search.split("=")[1];

    const IconStyle = {
        transform: "translateY(.2rem)",
        height: "2.5rem",
        marginRight: "1rem",
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        axios
            .get(`/search/movie`, {
                params: {
                    query: query,
                    page: 1,
                },
            })
            .then((res) => {
                const data = res.data.results;
                setMovieData(data);
            })
            .catch((err) => {
                console.log("ERROR:", err.response);
                setError(err.response.status);
            });

        axios
            .get(`/search/tv`, {
                params: {
                    query: query,
                    page: 1,
                },
            })
            .then((res) => {
                const data = res.data.results;
                setTvData(data);
            })
            .catch((err) => {
                console.log("ERROR:", err.response);
                setError(err.response.status);
            });
    }, [search, query]);

    if (error) {
        return <Redirect to="/error" />;
    }

    if (moviedata || tvdata) {
        return (
            <div className={classes.Pages}>
                <div className="container">
                    <h1 className={classes.Pages__Heading}>
                        <span>
                            <FontAwesomeIcon style={IconStyle} icon={faSearch} />
                        </span>
                        Search Result for "{query}"
                    </h1>
                    {moviedata && moviedata.length > 1 && <h2 className={classes.SearchGroupHeader}>Movies</h2>}
                    <div className={classes.Pages__Container}>
                        {moviedata &&
                            moviedata.length > 1 &&
                            moviedata.map(({ title, id, poster_path, vote_average }) => {
                                return <MovieCard key={id} path={`/movie/search/1/${id}`} Imgs={poster_path} title={title} rating={vote_average} />;
                            })}
                    </div>
                    {tvdata && tvdata.length > 1 && <h2 className={[classes.SearchGroupHeader, classes.SearchGroupHeader__Series].join(" ")}>Tv Series</h2>}
                    <div className={classes.Pages__Container}>
                        {tvdata &&
                            tvdata.length > 1 &&
                            tvdata.map(({ title, id, poster_path, vote_average }) => {
                                return <MovieCard key={id} path={`/tv/search/1/${id}`} Imgs={poster_path} title={title} rating={vote_average} />;
                            })}
                    </div>
                    <div className={classes.Pages__NoResult}>{moviedata && moviedata.length < 1 && tvdata && tvdata.length < 1 ? <NoResult query={query} /> : null}</div>
                </div>
            </div>
        );
    }

    return <Loader />;
};

export default Search;
