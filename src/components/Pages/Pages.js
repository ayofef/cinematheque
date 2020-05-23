import React, {useState, useEffect} from 'react';
import axios from "../../axiosInstance";
import { useParams, Redirect } from 'react-router-dom';
import MovieCard from '../UI/Utilities/MovieCard/MovieCard';
import Pagination from "../UI/Utilities/Pagination/Pagination";

import { capitalize } from "../UI/Utilities/capitalize";
import classes from './Pages.module.scss';
import Loader from "../UI/Utilities/Loader/Loader";
import { faClock, faStar, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//HELMET
import { Helmet } from "react-helmet-async";
import site from "../../assets/metaData.json";



//Template for Latest, Top Rated and Upcoming page. The axios request will just recieve the parameter from url to which page and which request to make//

const Pages = (props) => {

    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [error, setError] = useState(null);

    const { name, page} = useParams();

    const URL_PAGE = JSON.parse(page);

    let url;
    let heading;
    let icon;

    if(name === "latest-movies"){
        url = "now_playing"
        heading = "Latest Movies"
        icon= faClock
    }else if( name === "top-rated-movies"){
        url = "top_rated"
        heading = "Top Rated Movies"
        icon = faStar
    }else if( name === "upcoming-movies"){
        url = "upcoming"
        heading = "Upcomming Movies"
        icon = faCalendar
    }else if( name === "popular-movies"){
        url = "popular"
        heading = "Popular Movies"
        icon = faFire
    }
    
    
    
    const IconStyle = {
        transform: "translateY(.2rem)",
        height: "2.5rem",
        marginRight: "1rem"
    }
    
    useEffect(() => {

        window.scrollTo(0, 0);


        
            axios.get(`/movie/${url}`,  {
                params: {
                    page: page
            }})
            .then(res => {
                const data = res.data.results;
                setData(data)
                setTotalPages(res.data.total_pages);
            })
            .catch(err => {
                console.log("ERROR:", err.response)
                setError(err.response.status)
            })
        


        
    },[name, page, url])

    if(error){
        return(
            <Redirect to="/error"/>
        )
    }

    if(data){
        return(
            
            <div className={classes.Pages}>

            <Helmet> 
                <html lang="en" />
                <title>{site.siteMetadata.title} {heading}</title>
                <meta name="google-site-verification" content="0j6Ak" />
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
               <h1 className={classes.Pages__Heading}><span><FontAwesomeIcon style={IconStyle} icon={icon} /></span>{capitalize(heading)}</h1>
               <div className={classes.Pages__Container}>
                    {
                        data.map(({title, id, poster_path, vote_average}) => {
                            return(
                                <MovieCard key={id} path={`/${name}/${URL_PAGE}/${id}`} Imgs={poster_path} title={title} rating={vote_average}/>
                            )
                        })
                    }
                </div>
                <Pagination name={name} page={page} total={totalPages}/>
               </div>
            </div>
        )
    }

    return(
        <Loader />
    )
}



export default Pages;