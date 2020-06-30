import React from "react";
import Loader from "react-loader-spinner";

import classes from "./Loader.module.scss";

const Loading = () => {
    return (
        <div className={["darkLoader", `${classes.Loader__Auth}`].join(" ")}>
            <Loader type="Rings" color="#00BFFF" height={80} width={80} className={classes.Loader__Spinner} />
        </div>
    );
};

export default Loading;
