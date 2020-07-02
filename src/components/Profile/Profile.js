import React from "react";

import { Link, Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CardLoader from "./CardLoader/CardLoader";
import EmptyCollection from "../UI/Utilities/EmptyCollection/EmptyCollection";

import classes from "./Profile.module.scss";

const ProfileDetails = ({ dataBase, auth, profile }) => {
    const MOVIES = dataBase && auth && dataBase[auth.uid] ? dataBase[auth.uid].movieList.slice().sort((a, b) => b.added - a.added) : null;
    const SERIES = dataBase && auth && dataBase[auth.uid] ? dataBase[auth.uid].seriesList.slice().sort((a, b) => b.added - a.added) : null;

    const moviesTotal = dataBase && auth && dataBase[auth.uid] ? dataBase[auth.uid].movieList.length : null;
    const seriesTotal = dataBase && auth && dataBase[auth.uid] ? dataBase[auth.uid].seriesList.length : null;

    if (!auth.uid) {
        return <Redirect to="/sign-in" />;
    }

    return (
        <div className={classes.Profile}>
            <div className="container">
                <div className={classes.Profile__Header}>
                    <div className={classes.Profile__Header___Details}>
                        <h1 className={classes.Profile__Header___Details_UserName}>
                            {profile.firstName} {profile.lastName}
                        </h1>
                        <div className={classes.Profile__Header___Details_Stats}>
                            <span>{moviesTotal || "0"}</span> Movies &nbsp; <span>{seriesTotal || "0"}</span> Tv series
                        </div>
                        <div className={classes.Profile__Header___Details_ToEdit}>
                            <Link to="/profile/edit-profile">
                                <span style={{ marginRight: "1rem" }}>
                                    <FontAwesomeIcon icon={faUserEdit} />
                                </span>{" "}
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={classes.Profile__Body}>
                    <div className={classes.Profile__Body___Sections}>
                        <h2>Movies</h2>
                        <div className={classes.Profile__Body___Sections_BOXBOX}>{MOVIES && MOVIES.length > 1 ? MOVIES.map(({ movieID, id, watched }) => <CardLoader key={id} id={movieID} section="movie" watched={watched} />) : <EmptyCollection section="Movies" />}</div>
                    </div>
                    <div className={classes.Profile__Body___Sections}>
                        <h2>Tv Series</h2>
                        <div className={classes.Profile__Body___Sections_BOXBOX}>{SERIES && SERIES.length > 1 ? SERIES.map(({ seriesID, id, watched }) => <CardLoader key={id} id={seriesID} section="tv" watched={watched} />) : <EmptyCollection section="Tv Series" />}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        dataBase: state.firestore.data.lists,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [`lists/${props.auth.uid}`])
)(ProfileDetails);
