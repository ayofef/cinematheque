import * as actionType from "../actions/actionType";

const initialState = {
    signIn: {
        error: null,
        loading: false,
    },
    signUp: {
        error: null,
        loading: false,
    },
    verificationEmail: {
        error: null,
        loading: false,
        success: null,
    },
    passwordRecovery: {
        error: null,
        loading: false,
        success: null,
    },
    changePassword: {
        error: null,
        loading: false,
        success: null,
    },
    editProfile: {
        error: null,
        loading: false,
        success: null,
    },
    deleteAccount: {
        error: null,
        loading: false,
        success: null,
    },
    prevPath: "/",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        /*LOG_IN*/
        case actionType.LOGIN_LOADING:
            return {
                ...state,
                ...state.signIn,
                signIn: { error: null, loading: true },
            };
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                ...state.signIn,
                signIn: { error: null, loading: false },
            };
        case actionType.LOGIN_ERROR:
            return {
                ...state,
                ...state.signIn,
                signIn: { error: action.payload, loading: false },
            };
        /*LOG_IN*/

        /*SIGN_UP*/
        case actionType.SIGNUP_LOADING:
            return {
                ...state,
                ...state.signUp,
                signUp: { error: null, loading: true },
            };
        case actionType.SIGNUP_SUCCESS:
            return {
                ...state,
                ...state.signUp,
                signUp: { error: null, loading: false },
            };
        case actionType.SIGNUP_ERROR:
            return {
                ...state,
                ...state.signUp,
                signUp: { error: action.payload, loading: false },
            };
        /*SIGN_UP*/

        /*Reset Password*/
        case actionType.RESET_PASSWORD_LOADING:
            return {
                ...state,
                ...state.passwordRecovery,
                passwordRecovery: { error: null, loading: true, success: null },
            };
        case actionType.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                ...state.passwordRecovery,
                passwordRecovery: { error: null, loading: false, success: "Email successfully sent!" },
            };
        case actionType.RESET_PASSWORD_ERROR:
            return {
                ...state,
                ...state.passwordRecovery,
                passwordRecovery: { error: action.payload, loading: false, success: null },
            };
        /*Reset Password*/

        /*Change Password*/
        case actionType.CHANGE_PASSWORD_LOADING:
            return {
                ...state,
                ...state.changePassword,
                changePassword: { error: null, loading: true, success: null },
            };
        case actionType.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                ...state.changePassword,
                changePassword: { error: null, loading: false, success: "Password Successfully changed!" },
            };
        case actionType.CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                ...state.changePassword,
                changePassword: { error: action.payload, loading: false, success: null },
            };
        /*Change Password*/

        /*Edit Profile*/
        case actionType.EDIT_PROFILE_LOADING:
            return {
                ...state,
                ...state.editProfile,
                editProfile: { error: null, loading: true, success: null },
            };
        case actionType.EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                ...state.editProfile,
                editProfile: { error: null, loading: false, success: "Changes Successfully saved!" },
            };
        case actionType.EDIT_PROFILE_ERROR:
            return {
                ...state,
                ...state.editProfile,
                editProfile: { error: action.payload, loading: false, success: null },
            };
        /*Edit Profile*/

        /*verificationEmail*/
        case actionType.VERIFY_LOADING:
            return {
                ...state,
                ...state.verificationEmail,
                verificationEmail: { error: null, loading: true, success: null },
            };
        case actionType.VERIFY_SUCCESS:
            return {
                ...state,
                ...state.verificationEmail,
                verificationEmail: { error: null, loading: false, success: "Email successfully sent!" },
            };
        case actionType.VERIFY_ERROR:
            console.log(action.payload);
            return {
                ...state,
                ...state.verificationEmail,
                verificationEmail: { error: action.payload, loading: false, success: null },
            };
        /*verificationEmail*/

        /*delete Account*/
        case actionType.DELETE_ACCOUNT_LOADING:
            return {
                ...state,
                ...state.deleteAccount,
                deleteAccount: { error: null, loading: true, success: null },
            };
        case actionType.DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                ...state.deleteAccount,
                deleteAccount: { error: null, loading: false, success: "Account successfully deleted!" },
            };
        case actionType.DELETE_ACCOUNT_ERROR:
            console.log(action.payload);
            return {
                ...state,
                ...state.deleteAccount,
                deleteAccount: { error: action.payload, loading: false, success: null },
            };
        /*delete Account*/

        case actionType.SET_PREV_PATH:
            return {
                ...state,
                ...state.prevPath,
                prevPath: action.payload.toString(),
            };

        default:
            return state;
    }
};

export default authReducer;
