import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "../../axiosInstance";

import Loader from "../UI/Utilities/Loader/Loader";

import MovieDetails from "./MovieDetails/MovieDetails";
import TvDetails from "./TvDetails/TvDetails";

const Details = (props) => {
    const [data, setData] = useState(null);
    const [cast, setCast] = useState(null);

    const [error, setError] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const { id, section } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        axios
            .get(`/${section}/${id}`)
            .then((res) => {
                const data = res.data;
                setData(data);
            })
            .catch((err) => {
                setError(err.response.status || "{0}");
            });

        axios
            .get(`/${section}/${id}/credits`)
            .then((res) => {
                const data = res.data.cast;
                setCast(data);
            })
            .catch((err) => {
                setError(err.response.status || "{0}");
            });
    }, [id, section]);

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data && section === "movie") {
        return <MovieDetails data={data} cast={cast} isOpen={isOpen} setIsOpen={setIsOpen} id={id} />;
    }
    if (data && section === "tv") {
        return <TvDetails data={data} cast={cast} isOpen={isOpen} setIsOpen={setIsOpen} id={id} />;
    }

    return <Loader />;
};

export default Details;
