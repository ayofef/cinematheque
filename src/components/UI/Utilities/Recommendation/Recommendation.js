import React, {useEffect, useState} from 'react';
import MovieCard from "../MovieCard/MovieCard";
import axios from "../../../../axiosInstance";
import classes from "./Recommendation.module.scss";


const Recommendation = ({id, current}) => {

    const [recommendation, setRecommendation] = useState(null);

    useEffect(() => {
        
            axios.get(`/movie/${id}/recommendations`)
            .then(res => {
                const recData = res.data.results;
                setRecommendation(recData)
                console.log("reco", recData)
    
            })
            
        
    },[id])


    if(recommendation){
        return(
            <div className={classes.Recommendation}>
                <h2 className={["headingRecommendation", `${classes.Recommendation__Heading}`].join(" ")}>Bacause you viewed {current}</h2>
                <div className={classes.Recommendation__Box}>
                {
                    recommendation.map(({title, id, poster_path, vote_average}) => {
                        return(

                        <MovieCard key={id} path={`/recommendation/${id}`} Imgs={poster_path} title={title} rating={vote_average}/>
                            
                        )
                    })
                }
                </div>
            </div>
        )
    }

    return(<p>Loading...</p>)
}


export default Recommendation;