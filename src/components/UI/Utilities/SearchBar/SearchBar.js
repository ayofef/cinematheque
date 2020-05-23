import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from "./SearchBar.module.scss";


export default function SearchBar () {

    const [search, setSearch] = useState("");
    const history = useHistory();

    const IconStyle={
        marginLeft: "-2rem",
        transform: "translate(-.8rem, .5rem)"
    }

    return(
        <div>
            <div className={classes.Search}>
                <input type="text" placeholder="Search movies.." value={search} onChange={(e) => setSearch(e.target.value)} className={classes.Search__Input} onKeyPress={(event) => (search.length > 1) && (event.key === "Enter") ? (event.preventDefault(), history.push(`/search?query=${search}`), setSearch("")) : null}/>
                <Link to={search.length > 1 ? `/search?query=${search}` : "#"} onClick={() => setSearch("")} className={search.length > 1 ? classes.activeSearch : classes.inactiveSearch}>
                    <FontAwesomeIcon style={IconStyle} icon={ faSearch }/>
                </Link>
            </div>
        </div>
    )
}