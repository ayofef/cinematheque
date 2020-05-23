import React from 'react';
import Error from "../../../../assets/error.svg";
import { Link, useHistory } from "react-router-dom";
import classes from "./Error.module.scss";

import { faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconStyle = {
    transform: "translate(-1rem, .1rem)",
    margin: "0 1rem",
    display: "inline-block"
}

const ErrorUI = () => {

    const history = useHistory();
    
    return(
        <div className={classes.Error}>
            <div className="container">
                <img src={Error} alt="Cinematheque, Error encountered!"  className={classes.Error__Img}/>
                <h2  className={classes.Error__Heading}>Opps..</h2>
                <p>Something went wrong..<br/> Please try again!</p>
                <i onClick={() => history.goBack()}  className={classes.Error__Link}><FontAwesomeIcon style={IconStyle} icon={faAngleLeft}/> Go back</i> 
                <Link to="/"  className={classes.Error__Link}>Home</Link>
            </div>
        </div>
    )
}


export default ErrorUI;