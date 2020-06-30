import React from "react";
import { ReactComponent as Info } from "../../../../assets/info.svg";

import classes from "./EmptyCollection.module.scss";

const EmptyCollection = ({ section }) => {
    return (
        <div className={[classes.EmptyCollection, "emptyCollection"].join(" ")}>
            <Info />
            <p>No {section}</p>
        </div>
    );
};

export default EmptyCollection;
