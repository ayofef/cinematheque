import React from 'react';
import Loader from "react-loader-spinner";

import classes from "./Loader.module.scss";

const Loading = () => {
    return(
        <div className={classes.Loader_IMG}>
            <Loader type="BallTriangle" color="#1e212b" height={80} width={80} className={classes.Loader__Spinner}/>
        </div>
    )
}

export default Loading;