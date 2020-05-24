import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from "react-router-dom";
import Select from 'react-select';
import { faFilm} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import MovieCard from "../../UI/Utilities/MovieCard/MovieCard";
import Loader from "../../UI/Utilities/Loader/Loader";
import axios from "../../../axiosInstance";
import { capitalize } from "../../UI/Utilities/capitalize";
import Pagination from "../../UI/Utilities/Pagination/Pagination";
import classes from "./GenreRequest.module.scss";


//HELMET
import { Helmet } from "react-helmet-async";
import site from "../../../assets/metaData.json";




const IconStyle = {
    transform: "translateY(.2rem)",
    height: "2.5rem",
    marginRight: "1rem"
}



const GenreRequest = (props) => {


    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [sort, setSort] = useState({value: "popularity.desc" , label: "Popularity"});
    const [error, setError] = useState(null);

    const { value } = sort;
    
    const { pathname } = useLocation();
    // /genres/documentary-99/3
    
    const [, genre, whichGenre, page] = pathname.split("/")



    useEffect(() => {

        window.scrollTo(0, 0);
        
        axios.get("/discover/movie",  {
            params: {
                with_genres: whichGenre.split("-")[1],
                language: "en-US",
                sort_by: value,
                include_adult: false,
                include_video: false,
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
        


        
    }, [whichGenre, page, value, sort, setSort])


    const handleChange = (selectedOption) => {
        setSort(selectedOption);
    }

    const sortOption = [
        {value: "popularity.desc" , label: "Popularity"},
        {value: "release_date.desc" , label: "Release Date"},
        {value: "vote_average.desc" , label: "Ratings"},
    ];


    if(error){
        return(
            <Redirect to="/error"/>
        )
    }
    
    if(data){
        return(
            <div className={classes.GenreReq}>
                <Helmet> 
                    <html lang="en" />
                    <title>{site.siteMetadata.title} {capitalize(whichGenre.split("-")[0])}</title>
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
                <h1 className={classes.GenreReq__Heading}><span><FontAwesomeIcon style={IconStyle} icon={faFilm} /></span>{capitalize(whichGenre.split("-")[0])}</h1>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={sort}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={false}
                    name="color"
                    options={sortOption}
                    value={sort}
                    onChange={handleChange}
                />
                <div className={classes.GenreReq__Container}>
                        {
                            data.map(({title, id, poster_path, vote_average}) => {
                                return(
                                    <MovieCard key={id}  path={`${pathname}/${id}`} Imgs={poster_path} title={title} rating={vote_average}/>
                                )
                            })
                        }
                    </div>

                    <Pagination name={`${genre}/${whichGenre}`}  page={page} total={totalPages}/>
               </div>
            </div>
        )
    }
    
    return(
        <Loader />
    );
}
export default GenreRequest;





