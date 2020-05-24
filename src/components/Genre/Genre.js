import React, { useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";

import axios from "../../axiosInstance";
import Loader from "../UI/Utilities/Loader/Loader";
import GenreItem from "./GenreItem/GenreItem";
import classes from "./Genre.module.scss";

//HELMET
import { Helmet } from "react-helmet-async";
import site from "../../assets/metaData.json";



const Genre = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        if(!data){
            axios.get("/genre/movie/list")
            .then(res => {
                const data = res.data.genres;
                setData(data)
            })
            .catch(err => {
                console.log("ERROR:", err.response)
                setError(err.response.status)
            })
        }
    })


    if(error){
        return(
            <Redirect to="/error"/>
        )
    }

    if(data){
        return(
            <div className={classes.Genre}>

                <Helmet> 
                    <html lang="en" />
                    <title>{site.siteMetadata.title} Genres</title>
                    <meta name="google-site-verification" content="1PzEhgav7N4Baqikr-U-7dtjHbNRw5OiIuPtWKZABHU" />
                    <meta name="author" content={site.siteMetadata.author} />
                    <meta name="description" content={site.siteMetadata.description} />
                    <meta name="thumbnail" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
                    <meta name="robots" content={site.siteMetadata.robot} />
                    <meta name="og:title" content={site.siteMetadata.title} />
                    <meta name="og:keywords" content={site.siteMetadata.keywords} />
                    <meta name="og:type" content={site.siteMetadata.type} />
                    <meta name="og:url" content={site.siteMetadata.siteUrl} />
                    <meta name="og:image" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
                    <meta name="og:description" content={site.siteMetadata.description} />
                </Helmet>

                <div className="container">
                    <div className={classes.Genre__Box}>
                        {
                            data.map(({id, name}) => {
                                return(
                                    <GenreItem key={id} genre={name} id={id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    return(
        <Loader />
    );
}

export default Genre;