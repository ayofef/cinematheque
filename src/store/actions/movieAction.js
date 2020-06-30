import * as actionType from "./actionType";
import uniqid from "uniqid";

export const addMovie = (movieId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;

        const movieIndatabase = getState().firestore.data.lists[authId];
        const newMovie = {
            id: uniqid(),
            movieID: movieId,
            added: new Date(),
            watched: false,
        };

        dispatch({ type: actionType.ADD_MOVIE_LOADING });

        //check if user already has a list directory in database, if not create one (.set)
        if (!movieIndatabase) {
            firestore
                .collection("lists")
                .doc(authId)
                .set({
                    movieList: [newMovie],
                    seriesList: [],
                })
                .then(() => {
                    dispatch({ type: actionType.ADD_MOVIE });
                })
                .catch((err) => {
                    dispatch({ type: actionType.ADD_MOVIE_ERROR, payload: err });
                });
        } else
            firestore
                .collection("lists")
                .doc(authId)
                .update({
                    movieList: [...movieIndatabase.movieList, newMovie],
                    seriesList: [...movieIndatabase.seriesList],
                })
                .then(() => {
                    dispatch({ type: actionType.ADD_MOVIE });
                })
                .catch((err) => {
                    dispatch({ type: actionType.ADD_MOVIE_ERROR, payload: err });
                });
    };
};

export const addSeries = (seriesId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;

        const seriesIndatabase = getState().firestore.data.lists[authId];
        const newSeries = {
            id: uniqid(),
            seriesID: seriesId,
            added: new Date(),
            watched: false,
        };

        dispatch({ type: actionType.ADD_TV_LOADING });

        //check if user already has a todo directory in database, if not create one (.set)
        if (!seriesIndatabase) {
            firestore
                .collection("lists")
                .doc(authId)
                .set({
                    movieList: [],
                    seriesList: [newSeries],
                })
                .then(() => {
                    dispatch({ type: actionType.ADD_TV });
                })
                .catch((err) => {
                    dispatch({ type: actionType.ADD_TV_ERROR, payload: err });
                });
        } else
            firestore
                .collection("lists")
                .doc(authId)
                .update({
                    movieList: [...seriesIndatabase.movieList],
                    seriesList: [...seriesIndatabase.seriesList, newSeries],
                })
                .then(() => {
                    dispatch({ type: actionType.ADD_TV });
                })
                .catch((err) => {
                    dispatch({ type: actionType.ADD_TV_ERROR, payload: err });
                });
    };
};

export const watchedMovie = (movieId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;

        const movieIndatabase = getState().firestore.data.lists[authId];

        const movies = [...movieIndatabase.movieList];

        const IndexOfWatchedMovie = movies.findIndex((el) => el.movieID === movieId);

        movies[IndexOfWatchedMovie] = { ...movies[IndexOfWatchedMovie], watched: !movies[IndexOfWatchedMovie].watched };

        dispatch({ type: actionType.WATCHED_MOVIE_LOADING });

        //check if user already has a list directory in database, if not create one (.set)

        firestore
            .collection("lists")
            .doc(authId)
            .update({
                movieList: [...movies],
                seriesList: [...movieIndatabase.seriesList],
            })
            .then(() => {
                dispatch({ type: actionType.WATCHED_MOVIE });
            })
            .catch((err) => {
                dispatch({ type: actionType.WATCHED_MOVIE_ERROR, payload: err });
            });
    };
};

export const watchedSeries = (seriesId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;

        const seriesIndatabase = getState().firestore.data.lists[authId];

        const series = [...seriesIndatabase.seriesList];

        const IndexOfWatchedSeries = series.findIndex((el) => el.seriesID === seriesId);

        series[IndexOfWatchedSeries] = { ...series[IndexOfWatchedSeries], watched: !series[IndexOfWatchedSeries].watched };

        dispatch({ type: actionType.WATCHED_TV_LOADING });

        //check if user already has a list directory in database, if not create one (.set)

        firestore
            .collection("lists")
            .doc(authId)
            .update({
                movieList: [...seriesIndatabase.movieList],
                seriesList: [...series],
            })
            .then(() => {
                dispatch({ type: actionType.WATCHED_TV });
            })
            .catch((err) => {
                dispatch({ type: actionType.WATCHED_TV_ERROR, payload: err });
            });
    };
};

export const deleteMovie = (movieId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;

        const movieIndatabase = getState().firestore.data.lists[authId];

        const movies = [...movieIndatabase.movieList];

        const updatedMovies = movies.filter((el) => el.movieID !== movieId);

        dispatch({ type: actionType.DELETE_MOVIE_LOADING });

        firestore
            .collection("lists")
            .doc(authId)
            .update({
                movieList: [...updatedMovies],
                seriesList: [...movieIndatabase.seriesList],
            })
            .then(() => {
                dispatch({ type: actionType.DELETE_MOVIE });
            })
            .catch((err) => {
                dispatch({ type: actionType.DELETE_MOVIE_ERROR, payload: err });
            });
    };
};

export const deleteSeries = (seriesId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;

        const seriesIndatabase = getState().firestore.data.lists[authId];

        const series = [...seriesIndatabase.seriesList];

        const updatedSeries = series.filter((el) => el.seriesID !== seriesId);

        dispatch({ type: actionType.DELETE_MOVIE_LOADING });

        firestore
            .collection("lists")
            .doc(authId)
            .update({
                movieList: [...seriesIndatabase.movieList],
                seriesList: [...updatedSeries],
            })
            .then(() => {
                dispatch({ type: actionType.DELETE_MOVIE });
            })
            .catch((err) => {
                dispatch({ type: actionType.DELETE_MOVIE_ERROR, payload: err });
            });
    };
};
