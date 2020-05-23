import React from 'react';
import { Link } from "react-router-dom";
import { faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from "./Pagination.module.scss";


const Pagination = ({name, page, total}) => {

    const parsedPage = JSON.parse(page);
    const parsedTotal = JSON.parse(total);

    const IconStyle = {
        transform: "translateY(.1rem)",
        margin: "0 1rem",
        display: "inline-block"
    }

    return (
        <div className={classes.Pagination}>
            {parsedPage === 1 ? null : 
                <Link className={[`${classes.Pagination__Btn}`, `${classes.Pagination__Btn_Back}`].join(" ")} to={`/${name}/${parsedPage - 1}`}>
                    <FontAwesomeIcon style={IconStyle} icon={faAngleLeft}/>
                    Page {parsedPage - 1}
                </Link> 
            }

            {parsedPage >= parsedTotal ? null :
                <Link className={[`${classes.Pagination__Btn}`, `${classes.Pagination__Btn_Forward}`].join(" ")} to={`/${name}/${parsedPage + 1}`}>
                    Page {parsedPage + 1} of {parsedTotal}
                    <FontAwesomeIcon style={IconStyle} icon={faAngleRight}/>
                </Link>
            }
        </div>
    )
}

export default Pagination;