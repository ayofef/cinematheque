import React, { useState, useEffect } from "react";

import classes from "./ScreenError.module.scss";

const ScreenError = ({ error }) => {
    const [anyError, setAnyError] = useState(false);

    useEffect(() => {
        setAnyError(true);

        return () => setAnyError(false);
    }, [error]);

    if (error && anyError) {
        return (
            <div className={classes.ScreenError}>
                <p className={classes.ScreenError__Button} onClick={() => setAnyError(false)}>
                    x
                </p>
                <p className={classes.ScreenError__Error}>{error}</p>
            </div>
        );
    }
    return null;
};

export default ScreenError;
