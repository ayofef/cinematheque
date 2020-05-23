import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import axios from "../../axiosInstance";
import languages from '../UI/Utilities/Languages';
import { Img } from "../UI/Utilities/Images";
import ModalVideo from "react-modal-video";
import Recommendation from "../Recommendation/Recommendation";
import Loader from "../UI/Utilities/Loader/Loader";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { Backdrop } from "../UI/Utilities/Images";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CastSection from "../UI/Utilities/Casts/Index";

import SVG18 from "../../assets/18.svg";
import classes from "./Details.module.scss";



//HELMET
import { Helmet } from "react-helmet-async";
import site from "../../assets/metaData.json";



const IconStyle = {
    height: "4rem",
}



const MovieDetails = (props) => {
    const [data, setData] = useState(null);
    const [cast, setCast] = useState(null);

    const [error, setError] = useState(null);
    
    const [isOpen, setIsOpen] = useState(false);

    const {id} = useParams();
    

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`/movie/${id}`)
        .then(res => {
            const data = res.data;
            setData(data)


        })
        .catch(err => {
            console.log("ERROR:", err.response)
            setError(err.response.status)
        })


        axios.get(`/movie/${id}/credits`)
        .then(res => {
            const data = res.data.cast;
            setCast(data)


        })

    },[id])

    

   if(error){
       return(
           <Redirect to="/error"/>
       )
   }

   if(data){
       const {adult, backdrop_path,  vote_average, status, tagline, genres, title, overview, runtime, poster_path, release_date, videos, original_language } = data;

        const {name} = languages.find(el => el.code === original_language);
        const date = release_date.split("-")[0];
        const genre = genres.slice(0, 3).map((el) =>{
            const arr = [];
            arr.push(el.name.split(" ").join("-"));

            return arr;

        })
        
        return(
            <div className={classes.Details}>

                <Helmet> 
                    <html lang="en" />
                    <title>{site.siteMetadata.title} {title}</title>
                    <meta name="google-site-verification" content="0j6Ak" />
                    <meta name="author" content={site.siteMetadata.author} />
                    <meta name="description" content={site.siteMetadata.description , overview} />
                    <meta name="thumbnail" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
                    <meta name="robots" content={site.siteMetadata.robot} />
                    <meta name="og:title" content={site.siteMetadata.title, title} />
                    <meta name="og:keywords" content={site.siteMetadata.keywords} />
                    <meta name="og:type" content={site.siteMetadata.type} />
                    <meta name="og:url" content={site.siteMetadata.siteUrl} />
                    <meta name="og:image" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
                    <meta name="og:description" content={site.siteMetadata.description, overview} />
                </Helmet>
                <div className="container">
                    <div className={classes.Details__Box}>
                        <div className={classes.Details__Box___Image}>
                            <Img id={poster_path} title={title} />
                        </div>
                        <div className={classes.Details__Box___Overview}>
                            <h1 className={classes.Details__Box___Overview____Heading}>{title}     
                                <span>
                                    <div className={classes.Details__Box___Overview____Heading_rating}>
                                    <CircularProgressbarWithChildren 
                                        value={JSON.parse(vote_average) / 10 * 100} 
                                        
                                        styles={buildStyles({
                                            textSize: "16px",
                                            pathColor: "#3c3d4c",
                                            trailColor: "#cfdbd5"
                                        })}
                                    >
                                        <div style={{ fontSize: 12, color: "#3c3d4c" }}>
                                            {vote_average}
                                        </div>
                                    </CircularProgressbarWithChildren>
                                    </div>
                                    {adult ? <img src={SVG18} alt={title + " adult logo"}/> : null}
                                </span>
                            </h1>
                            <div className={["detailsBadges", `${classes.Details__Box___Badges}`].join(" ")}>
                                <p><span>Status: </span> {status}</p>
                                <p><span>Year: </span> {date}</p>
                                <p><span>Runtime: </span> {runtime}min</p>
                                <p><span>Genre: </span> {genre.join(" / ")}</p>
                                <p><span>Language </span> {name}</p>
                            </div>
                            <div className={classes.Details__Box___Overview_Context}>
                                <p className={classes.Details__Box___Overview_Tagline}>{tagline}</p>
                                <p>{overview}</p>
                            </div>
                            
                            {
                                videos.results[0] &&  backdrop_path ?
                                <div className={["detailsTrailer", `${classes.Details__Box___Overview_Trailer}`].join(" ")} onClick={() => setIsOpen(!isOpen)}>
                                    <Backdrop id={backdrop_path} title={title}/>
                                    
                                    <div className={classes.Details__Box___Overview_Trailer_play}><FontAwesomeIcon style={IconStyle} icon={faPlayCircle} size="3x"/></div>
                                </div> : null
                            }
                            {
                                videos.results[0] ?
                                <ModalVideo channel={videos.results[0].site.toLowerCase()} isOpen={isOpen} videoId={videos.results[0].key} onClose={() => setIsOpen(!isOpen)} /> : null
                            }
                            
                            <CastSection cast={cast} styleID={classes.SlideCasts}/>

                        
                        </div>
                        
                    </div>
                    <Recommendation id={id} current={title}/>
                </div>
                
            </div>
        )
    }

    return(
        <Loader />
    );
}

export default MovieDetails;