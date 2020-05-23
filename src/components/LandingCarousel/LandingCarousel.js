import React, { useEffect, useState} from 'react';
import axios from "../../axiosInstance";
import { Link } from "react-router-dom";

import { Backdrop, Img } from "../UI/Utilities/Images";
import classes from "./LandingCarousel.module.scss";


const Landing = () => {
    const [data, setData] = useState(null);



    useEffect(() => {
        if(!data){
            axios.get("/movie/top_rated")
            .then(res => {
                const data = res.data.results;
                setData(data.slice(0, 3))


            })
        }


        
    })



    
    console.log(data)

    if(data){
        return(
            <div className={classes.LandingSlide}>
             
                {
                    data.map(({backdrop_path, title, id, poster_path, overview, vote_average }) => {
                        return(
                            
                            <div key={id} className={classes.LandingSlide_box}>
                                <Link to={`/home/${id}`} className={classes.LandingSlide_Link}>
                                <Backdrop id={backdrop_path} title={title}/>
                                <div className={classes.LandingSlide__content}>
                                    <div className={classes.LandingSlide__poster}>
                                        <Img style={classes.LandingSlide__poster___img} id={poster_path} title={title} />
                                        
                                        <div className={classes.LandingSlide__poster___overview}>
                                            <h1>{title}</h1>
                                            <p>{overview.length > 100 ? overview.substr(0,100).trim() + "..." : overview}</p>
                                        </div>
                                    </div>
                                    </div>
                                    </Link>
                                </div>
                            
                        )
                    })
                }
         
            </div>
        )
    }
    return(
        <p>Loading... </p>
    );

}

export default Landing;