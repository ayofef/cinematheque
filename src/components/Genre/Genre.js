import React, { useEffect, useState} from 'react';


import axios from "../../axiosInstance";
import Loader from "../UI/Utilities/Loader/Loader";
import GenreItem from "./GenreItem/GenreItem";
import classes from "./Genre.module.scss";


const Genre = () => {

    const [data, setData] = useState(null);


    useEffect(() => {
        if(!data){
            axios.get("/genre/movie/list")
            .then(res => {
                const data = res.data.genres;
                setData(data)
            })
        }
    })

    console.log(data)

    if(data){
        return(
            <div className={classes.Genre}>
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