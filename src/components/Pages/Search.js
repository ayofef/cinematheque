import React, { useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import { useLocation, Link } from 'react-router-dom';
import MovieCard from '../UI/Utilities/MovieCard/MovieCard';
import Pagination from "../UI/Utilities/Pagination/Pagination";

import { capitalize } from "../UI/Utilities/capitalize";
import Loader from "../UI/Utilities/Loader/Loader";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from "./Pages.module.scss";





const Search = (props) => {

    const [data, setData] = useState(null);

    const { search } = useLocation();

    const query = search.split("=")[1];



    
    
    
    console.log(props)
    console.log(query)
    const IconStyle = {
        transform: "translateY(.2rem)",
        height: "2.5rem",
        marginRight: "1rem"
    }
    
    useEffect(() => {

        window.scrollTo(0, 0);

            axios.get(`/search/movie/`,  {
                params: {
                    query: query, 
                    page: 1
            }})
            .then(res => {
                const data = res.data.results;
                setData(data)
            })
        


        
    },[search, query])

    if(data){
        return(
            <div className={classes.Pages}>
               <div className="container">
        <h1 className={classes.Pages__Heading}><span><FontAwesomeIcon style={IconStyle} icon={faSearch} /></span>Search Result for "{query}"</h1>
               <div className={classes.Pages__Container}>
                    {
                        data && data.map(({title, id, poster_path, vote_average}) => {
                            return(
                                <MovieCard key={id} path={`/search/1/${id}`} Imgs={poster_path} title={title} rating={vote_average}/>
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
    )
}


export default Search;