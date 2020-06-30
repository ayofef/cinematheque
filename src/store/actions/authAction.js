import * as actionType from "./actionType";

export const SIGN_IN = () => {
    return {
        type: actionType.LOGIN_SUCCESS,
    };
};

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        dispatch({ type: actionType.LOGIN_LOADING });
        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                dispatch(SIGN_IN());
            })
            .catch((err) => {
                dispatch({ type: actionType.LOGIN_ERROR, payload: err });
            });
    };
};

export const signInGmail = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                const firstName = user.displayName.split(" ")[0];
                const lastName = user.displayName.split(" ")[1];
                const initials = firstName[0].toUpperCase() + lastName[0].toUpperCase();

                return firestore.collection("users").doc(user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    initials: initials,
                });
            })
            .then(() => {
                dispatch(SIGN_IN());
            })
            .catch((err) => {
                dispatch({ type: actionType.LOGIN_ERROR, payload: err });
            });
    };
};

export const signInGitHub = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const provider = new firebase.auth.GithubAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                // The signed-in user info.read:user
                const user = result.user;

                const firstName = user.displayName.split(" ")[0];
                const lastName = user.displayName.split(" ")[1];
                const initials = firstName[0].toUpperCase() + lastName[0].toUpperCase();

                return firestore.collection("users").doc(user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    initials: initials,
                });
            })
            .then(() => {
                dispatch(SIGN_IN());
            })
            .catch((err) => {
                dispatch({ type: actionType.LOGIN_ERROR, err });
            });
    };
};

export const SIGN_OUT = () => {
    return {
        type: actionType.SIGNOUT_SUCCESS,
    };
};
export const signOut = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch(SIGN_OUT());
            });
    };
};

export const SIGN_UP = () => {
    return {
        type: actionType.SIGNUP_SUCCESS,
    };
};
export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        dispatch({ type: actionType.SIGNUP_LOADING });

        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((response) => {
                response.user.sendEmailVerification();
                return firestore
                    .collection("users")
                    .doc(response.user.uid)
                    .set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        initials: newUser.firstName[0].toUpperCase() + newUser.lastName[0].toUpperCase(),
                    });
            })
            .then(() => {
                dispatch(SIGN_UP());
            })
            .catch((err) => {
                dispatch({ type: actionType.SIGNUP_ERROR, payload: err });
            });
    };
};

export const RESET_PASSWORD = () => {
    return {
        type: actionType.RESET_PASSWORD_SUCCESS,
    };
};

export const resetPassword = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        dispatch({ type: actionType.RESET_PASSWORD_LOADING });

        firebase
            .auth()
            .sendPasswordResetEmail(email.email)
            .then(() => {
                dispatch(RESET_PASSWORD());
            })
            .catch((err) => {
                dispatch({ type: actionType.RESET_PASSWORD_ERROR, payload: err });
            });
    };
};

export const CHANGE_PASSWORD = () => {
    return {
        type: actionType.CHANGE_PASSWORD_SUCCESS,
    };
};

export const changePassword = (newPassword) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        var user = firebase.auth().currentUser;
        const changedPassword = newPassword.password;

        dispatch({ type: actionType.CHANGE_PASSWORD_LOADING });

        user.updatePassword(changedPassword)
            .then(() => {
                dispatch(CHANGE_PASSWORD());
            })
            .catch((err) => {
                dispatch({ type: actionType.CHANGE_PASSWORD_ERROR, payload: err });
            });
    };
};

export const EDIT_PROFILE = () => {
    return {
        type: actionType.EDIT_PROFILE_SUCCESS,
    };
};
export const editProfile = (newCredential) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        var user = firebase.auth().currentUser;

        dispatch({ type: actionType.EDIT_PROFILE_LOADING });

        firestore
            .collection("users")
            .doc(user.uid)
            .set({
                firstName: newCredential.firstName,
                lastName: newCredential.lastName,
                initials: newCredential.firstName[0].toUpperCase() + newCredential.lastName[0].toUpperCase(),
            })
            .then(() => {
                dispatch(EDIT_PROFILE());
            })
            .catch((err) => {
                dispatch({ type: actionType.EDIT_PROFILE_ERROR, payload: err });
            });
    };
};

export const VERIFY_EMAIL = () => {
    return {
        type: actionType.VERIFY_SUCCESS,
    };
};
export const verifyEmail = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        dispatch({ type: actionType.VERIFY_LOADING });

        var user = firebase.auth().currentUser;
        user.sendEmailVerification()
            .then(() => {
                dispatch(VERIFY_EMAIL());
            })
            .catch((err) => {
                dispatch({ type: actionType.VERIFY_ERROR, payload: err });
            });
    };
};

export const DELETE_ACCOUNT = () => {
    return {
        type: actionType.DELETE_ACCOUNT_SUCCESS,
    };
};
export const deleteAccount = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        var user = firebase.auth().currentUser;

        dispatch({ type: actionType.EDIT_PROFILE_LOADING });

        firestore
            .collection("lists")
            .doc(user.uid)
            .delete()
            .then(() => {
                firestore.collection("users").doc(user.uid).delete();
            })
            .then(() => {
                user.delete();
                console.log(user.uid);
                dispatch(DELETE_ACCOUNT());
            })
            .catch((err) => {
                dispatch({ type: actionType.DELETE_ACCOUNT_ERROR, payload: err });
            });
    };
};

export const setPrevPath = (newPath) => {
    return (dispatch, getState) => {
        dispatch({ type: actionType.SET_PREV_PATH, payload: newPath });
    };
};
