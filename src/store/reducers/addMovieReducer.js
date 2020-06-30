import * as actionType from "../actions/actionType";

const initialState = {
    addMovie: {
        error: null,
        loading: false,
    },
    addSeries: {
        error: null,
        loading: false,
    },
    watchedMovie: {
        error: null,
        loading: false,
    },
    watchedSeries: {
        error: null,
        loading: false,
    },
    deleteMovie: {
        error: null,
        loading: false,
    },
    deleteSeries: {
        error: null,
        loading: false,
    },
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_MOVIE_LOADING:
            // console.log(action.type);
            return {
                ...state,
                ...state.addMovie,
                addMovie: { error: null, loading: true },
            };
        case actionType.ADD_MOVIE:
            return {
                ...state,
                ...state.addMovie,
                addMovie: { error: null, loading: false },
            };
        case actionType.ADD_MOVIE_ERROR:
            return {
                ...state,
                ...state.addMovie,
                addMovie: { error: action.payload, loading: false },
            };

        case actionType.ADD_TV_LOADING:
            // console.log(action.type);
            return {
                ...state,
                ...state.addSeries,
                addSeries: { error: null, loading: true },
            };
        case actionType.ADD_TV:
            return {
                ...state,
                ...state.addSeries,
                addSeries: { error: null, loading: false },
            };
        case actionType.ADD_TV_ERROR:
            return {
                ...state,
                ...state.addSeries,
                addSeries: { error: action.payload, loading: false },
            };

        case actionType.WATCHED_MOVIE_LOADING:
            // console.log(action.type);
            return {
                ...state,
                ...state.watchedMovie,
                watchedMovie: { error: null, loading: true },
            };
        case actionType.WATCHED_MOVIE:
            return {
                ...state,
                ...state.watchedMovie,
                watchedMovie: { error: null, loading: false },
            };
        case actionType.WATCHED_MOVIE_ERROR:
            return {
                ...state,
                ...state.watchedMovie,
                watchedMovie: { error: action.payload, loading: false },
            };

        case actionType.WATCHED_TV_LOADING:
            // console.log(action.type);
            return {
                ...state,
                ...state.watchedSeries,
                watchedSeries: { error: null, loading: true },
            };
        case actionType.WATCHED_TV:
            return {
                ...state,
                ...state.watchedSeries,
                watchedSeries: { error: null, loading: false },
            };
        case actionType.WATCHED_TV_ERROR:
            return {
                ...state,
                ...state.watchedSeries,
                watchedSeries: { error: action.payload, loading: false },
            };
        case actionType.DELETE_MOVIE_LOADING:
            // console.log(action.type);
            return {
                ...state,
                ...state.deleteMovie,
                deleteMovie: { error: null, loading: true },
            };
        case actionType.DELETE_MOVIE:
            return {
                ...state,
                ...state.deleteMovie,
                deleteMovie: { error: null, loading: false },
            };
        case actionType.DELETE_MOVIE_ERROR:
            return {
                ...state,
                ...state.deleteMovie,
                deleteMovie: { error: action.payload, loading: false },
            };
        case actionType.DELETE_TV_LOADING:
            // console.log(action.type);
            return {
                ...state,
                ...state.deleteSeries,
                deleteSeries: { error: null, loading: true },
            };
        case actionType.DELETE_TV:
            return {
                ...state,
                ...state.deleteSeries,
                deleteSeries: { error: null, loading: false },
            };
        case actionType.DELETE_TV_ERROR:
            return {
                ...state,
                ...state.deleteSeries,
                deleteSeries: { error: action.payload, loading: false },
            };
        default:
            return state;
    }
};

export default projectReducer;
