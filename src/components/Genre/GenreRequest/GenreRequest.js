import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import { faFilm} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import MovieCard from "../../UI/Utilities/MovieCard/MovieCard";
import Loader from "../../UI/Utilities/Loader/Loader";
import axios from "../../../axiosInstance";
import { capitalize } from "../../UI/Utilities/capitalize";
import Pagination from "../../UI/Utilities/Pagination/Pagination";
import classes from "./GenreRequest.module.scss";


const IconStyle = {
    transform: "translateY(.2rem)",
    height: "2.5rem",
    marginRight: "1rem"
}



const GenreRequest = (props) => {


    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [sort, setSort] = useState({value: "popularity.desc" , label: "Popularity"});

    const { value } = sort;
    
    const { pathname } = useLocation();
    // /genres/documentary-99/3
    
    const [, genre, whichGenre, page] = pathname.split("/")

    console.log( genre, whichGenre, page );

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
        


        
    }, [whichGenre, page, value, sort, setSort])

    console.log(props)
    const handleChange = (selectedOption) => {
        setSort(selectedOption);
    }

    const sortOption = [
        {value: "popularity.desc" , label: "Popularity"},
        {value: "release_date.desc" , label: "Release Date"},
        {value: "vote_average.desc" , label: "Ratings"},
    ];
    console.log(sort)
    
    if(data){
        return(
            <div className={classes.GenreReq}>
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





