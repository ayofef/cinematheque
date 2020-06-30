import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRE_API_KEY,
    authDomain: "cinematheque-f453a.firebaseapp.com",
    databaseURL: process.env.REACT_APP_API_databaseURL,
    projectId: "cinematheque-f453a",
    storageBucket: process.env.REACT_APP_API_storageBucket,
    messagingSenderId: process.env.REACT_APP_API_messagingSenderId,
    appId: process.env.REACT_APP_API_appId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();

export default firebase;
