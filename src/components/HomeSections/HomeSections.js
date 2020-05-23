import React, {useState, useEffect} from 'react';
import axios from "../../axiosInstance";
import Markup from "./Markup";
import { Redirect } from "react-router-dom";
import { faClock, faStar, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faFire} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from "../UI/Utilities/Loader/Loader";

const IconStyle = {
    transform: "translateY(.2rem)",
    height: "2.5rem",
    marginRight: "1rem"
}

export const Latest = () => {


    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        if(!data){
            axios.get("/movie/now_playing",  {
                params: {
                    page: 1
            }})
            .then(res => {
                const data = res.data.results;
                setData(data.slice(0, 5))
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
            <Markup heading="Latest Movies" data={data} path="/latest-movies/1">
                <FontAwesomeIcon style={IconStyle} icon={faClock} />
            </Markup>
        )
    }
    
    return(
        <Loader />
    );
}
export const TopRated = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        if(!data){
            axios.get("/movie/top_rated")
            .then(res => {
                const data = res.data.results;
                setData(data.slice(0, 5))
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
            <Markup heading="Top Rated Movies" data={data} path="/top-rated-movies/1">
                <FontAwesomeIcon style={IconStyle} icon={faStar} />
            </Markup>
        )
    }
    
    return(
        <Loader />
    );
}


export const Popular = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        if(!data){
            axios.get("/movie/popular")
            .then(res => {
                const data = res.data.results;
                setData(data.slice(0, 5))
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
            <Markup heading="Popular Movies" data={data} path="/popular-movies/1">
                <FontAwesomeIcon style={IconStyle} icon={faFire} />
            </Markup>
        )
    }
    
    return(
        <Loader />
    );
}


export const Upcoming = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        if(!data){
            axios.get("/movie/upcoming", {
                params: {
                    page: 2
            }})
            .then(res => {
                const data = res.data.results;
                setData(data.slice(0, 5))
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
            <Markup heading="Upcoming Movies" data={data} path="/upcoming-movies/1">
                <FontAwesomeIcon style={IconStyle} icon={faCalendar} />
            </Markup>
        )
    }
    
    return(
        <Loader />
    );
}
