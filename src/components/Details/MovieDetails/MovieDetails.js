import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { faPlayCircle, faEye, faEyeSlash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalVideo from "react-modal-video";

import { ReactComponent as CollectionSVG } from "../../../assets/addCollection.svg";

import classes from "../Details.module.scss";
import CastSection from "../../UI/Utilities/Casts/Index";
import languages from "../../UI/Utilities/Languages";
import { Img, Backdrop } from "../../UI/Utilities/Images";
import Recommendation from "../../Recommendation/Recommendation";

import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/actions/movieAction";
import { setPrevPath } from "../../../store/actions/authAction";

import ButtonLoader from "../../UI/Utilities/Loader/ButtonLoader";

//HELMET
import { Helmet } from "react-helmet-async";
import site from "../../../assets/metaData.json";

import SVG18 from "../../../assets/18.svg";
import ScreenError from "../../UI/Utilities/ScreenError/ScreenError";

const IconStyle = {
    height: "4rem",
};

const MovieDetails = ({ data, cast, isOpen, setIsOpen, id, addMovie, movies, dataBase, auth, prevPath, watchedMovie, deleteMovie }) => {
    const [existed, setExisted] = useState(null);
    const history = useHistory();

    const { adult, backdrop_path, vote_average, status, tagline, genres, title, overview, runtime, poster_path, release_date, videos, original_language } = data;

    const { name } = languages.find((el) => el.code === original_language);
    const date = release_date.split("-")[0];
    const genre = genres.slice(0, 3).map((el) => {
        const arr = [];
        arr.push(el.name.split(" ").join("-"));

        return arr;
    });

    // console.log(data);

    //check if movie is already in database
    const StoreChecker = () => {
        const db = dataBase;

        if (db && db[auth.uid] && db[auth.uid].movieList) {
            const exists = db[auth.uid].movieList.find((el) => el.movieID === id);

            return setExisted(exists);
            // return exists;
        }
        return null;
    };

    const AddMoviesToDb = (e) => {
        if (!auth.uid) {
            prevPath(history.location.pathname);
            history.push("/sign-in");
        } else if (auth.uid && existed) {
            return e.preventDefault();
        } else if (auth.uid && !existed) {
            return addMovie(id);
        }

        // return console.log("auth:", auth.uid, existed);
        return null;
    };

    useEffect(() => {
        StoreChecker();
        // const checker = StoreChecker();
        // setExisted(checker);
    }, [existed, setExisted, StoreChecker]);

    // console.log(existed, StoreChecker());
    return (
        <div className={classes.Details}>
            <Helmet>
                <html lang="en" />
                <title>{[site.siteMetadata.title, title].join(" ")}</title>
                <meta name="google-site-verification" content="1PzEhgav7N4Baqikr-U-7dtjHbNRw5OiIuPtWKZABHU" />
                <meta name="author" content={site.siteMetadata.author} />
                <meta name="description" content={[site.siteMetadata.description, overview].join(" ")} />
                <meta name="thumbnail" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
                <meta name="robots" content={site.siteMetadata.robot} />
                <meta name="og:title" content={[site.siteMetadata.title, title].join(" ")} />
                <meta name="og:keywords" content={site.siteMetadata.keywords} />
                <meta name="og:type" content={site.siteMetadata.type} />
                <meta name="og:url" content={site.siteMetadata.siteUrl} />
                <meta name="og:image" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
                <meta name="og:description" content={[site.siteMetadata.description, overview].join(" ")} />
            </Helmet>
            <div className="container">
                <div className={classes.Details__Box}>
                    <div className={classes.Details__Box___Image}>
                        <Img id={poster_path} title={title} />
                    </div>
                    <div className={classes.Details__Box___Overview}>
                        <h1 className={classes.Details__Box___Overview____Heading}>
                            {title}
                            <span>
                                <div className={classes.Details__Box___Overview____Heading_rating}>
                                    <CircularProgressbarWithChildren
                                        value={(JSON.parse(vote_average) / 10) * 100}
                                        styles={buildStyles({
                                            textSize: "16px",
                                            pathColor: "#3c3d4c",
                                            trailColor: "#cfdbd5",
                                        })}
                                    >
                                        <div style={{ fontSize: 12, color: "#3c3d4c" }}>{vote_average}</div>
                                    </CircularProgressbarWithChildren>
                                </div>
                                {adult ? <img src={SVG18} alt={title + " adult logo"} /> : null}
                            </span>
                        </h1>
                        <div className={["detailsBadges", `${classes.Details__Box___Badges}`].join(" ")}>
                            <p>
                                <span>Status: </span> {status}
                            </p>
                            <p>
                                <span>Year: </span> {date}
                            </p>
                            <p>
                                <span>Runtime: </span> {runtime}min
                            </p>
                            <p>
                                <span>Language </span> {name}
                            </p>
                            <p>
                                <span>Genre: </span> {genre.join(" / ")}
                            </p>
                        </div>
                        <div className={classes.Details__Box___Overview_Context}>
                            <p className={classes.Details__Box___Overview_Tagline}>{tagline}</p>
                            <p>{overview}</p>
                        </div>

                        {videos.results[0] && backdrop_path ? (
                            <div className={["detailsTrailer", `${classes.Details__Box___Overview_Trailer}`].join(" ")} onClick={() => setIsOpen(!isOpen)}>
                                <Backdrop id={backdrop_path} title={title} />

                                <div className={classes.Details__Box___Overview_Trailer_play}>
                                    <FontAwesomeIcon style={IconStyle} icon={faPlayCircle} size="3x" />
                                </div>
                            </div>
                        ) : null}
                        {videos.results[0] ? <ModalVideo channel={videos.results[0].site.toLowerCase()} isOpen={isOpen} videoId={videos.results[0].key} onClose={() => setIsOpen(!isOpen)} /> : null}

                        <CastSection cast={cast} styleID={classes.SlideCasts} />
                        <div className={[classes.Details__Box__ReduxButtons, "ReduxButton"].join(" ")}>
                            {!existed ? (
                                <button className={[classes.Details__Box___AddToList, existed ? classes.Details__Box___AddToList____Disabled : null].join(" ")} onClick={(e) => AddMoviesToDb(e)}>
                                    {movies.add.loading ? null : (
                                        <span>
                                            <CollectionSVG />
                                        </span>
                                    )}
                                    {movies.add.loading ? (
                                        <div>
                                            <ButtonLoader />
                                        </div>
                                    ) : (
                                        `Add${existed ? "ed" : ""} to Watch list`
                                    )}
                                </button>
                            ) : null}
                            {existed ? (
                                <button className={[classes.Details__Box___AddToList].join(" ")} onClick={() => watchedMovie(id)}>
                                    {movies.watch.loading ? null : (
                                        <i style={{ marginRight: "1.5rem" }}>
                                            <FontAwesomeIcon icon={existed.watched ? faEyeSlash : faEye} />
                                        </i>
                                    )}
                                    {movies.watch.loading ? (
                                        <div>
                                            <ButtonLoader />
                                        </div>
                                    ) : (
                                        `${existed.watched ? " Unwatch" : "Watched"}`
                                    )}
                                </button>
                            ) : null}
                            {existed ? (
                                <button className={[classes.Details__Box___AddToList].join(" ")} onClick={() => deleteMovie(id)}>
                                    {movies.delete.loading ? null : (
                                        <i style={{ marginRight: "1.5rem" }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </i>
                                    )}
                                    {movies.delete.loading ? (
                                        <div>
                                            <ButtonLoader />
                                        </div>
                                    ) : (
                                        "Remove from List"
                                    )}
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
                <Recommendation id={id} current={title} section={"movie"} />
                {movies.error ? <ScreenError error={movies.add.error || movies.watch.error || movies.delete.error} /> : null}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        movies: {
            add: state.movies.addMovie,
            watch: state.movies.watchedMovie,
            delete: state.movies.deleteMovie,
        },
        dataBase: state.firestore.data.lists,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addMovie: (newMovie) => dispatch(actionCreator.addMovie(newMovie)),
        watchedMovie: (id) => dispatch(actionCreator.watchedMovie(id)),
        deleteMovie: (id) => dispatch(actionCreator.deleteMovie(id)),
        prevPath: (newPath) => dispatch(setPrevPath(newPath)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [`lists/${props.auth.uid}`])
)(MovieDetails);
