import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import "../node_modules/react-circular-progressbar/dist/styles.css";

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import ReduxThunk from "redux-thunk";
import { reduxFirestore, getFirestore, createFirestoreInstance, firestoreReducer } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase, firebaseReducer, isLoaded } from "react-redux-firebase";
import fbConfig from "./config/fbconfig";
import firebase from "firebase/app";

import Loader from "./components/UI/Utilities/Loader/authLoader";
import authReducer from "./store/reducers/authReducer";
import addMovieReducer from "./store/reducers/addMovieReducer";

/** REDUX DEV TOOL **/
const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

/** COMBINING REDUCERS */
const rootReducer = combineReducers({
    auth: authReducer,
    movies: addMovieReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(fbConfig)));
const rrfconfig = {
    userProfile: "users", // where profiles are stored in database,
    useFirestoreForProfile: true,
};
const rrfProps = {
    firebase,
    fbconfig: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
    config: rrfconfig,
    presence: "presence",
};

function AuthIsLoaded({ children }) {
    const auth = useSelector((state) => state.firebase.auth);
    if (!isLoaded(auth)) return <Loader />;
    return children;
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
