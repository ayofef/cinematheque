import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreator from "../../../store/actions/authAction";

import classes from "../Auth.module.scss";

import { Helmet } from "react-helmet-async";
import site from "../../../assets/metaData.json";

import ButtonLoader from "../../UI/Utilities/Loader/ButtonLoader";
import { errorFormat } from "../../UI/Utilities/errorFormatter";

const SignIn = (props) => {
    const { id, loading, error, success, verified } = props;

    if (!id) {
        return <Redirect to="/" />;
    }

    if (id && verified) {
        return <Redirect to="/" />;
    }

    return (
        <div className={classes.BOXBOX}>
            <Helmet>
                <title>{site.siteMetadata.title} Verify email</title>
                <meta name="google-site-verification" content="0j6Ak-DmlE9O9Iq6AsPF3Ydvg4057AYgw7ilMoZV6sM" />
                <meta name="author" content={site.siteMetadata.author} />
                <meta name="description" content={site.siteMetadata.description} />
                <meta name="thumbnail" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
                <meta name="robots" content={site.siteMetadata.robot} />
                <meta name="og:title" content={site.siteMetadata.title} />
                <meta name="og:keywords" content={site.siteMetadata.keywords} />
                <meta name="og:type" content={site.siteMetadata.type} />
                <meta name="og:url" content={site.siteMetadata.siteUrl} />
                <meta name="og:image" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
                <meta name="og:description" content={site.siteMetadata.description} />
            </Helmet>
            <div className="container-auth">
                <div className={classes.Auth}>
                    <div className={classes.Auth__Intro}>
                        <p className={classes.Auth__Intro___Title}>Verify Your Email</p>
                    </div>
                    <div className={classes.Auth__Form}>
                        <button type="submit" className={classes.Auth__Form___Button} onClick={() => props.verifyEmailAddress()}>
                            {loading && !error ? <ButtonLoader /> : "Resend verification email"}
                        </button>
                    </div>
                    <div className={classes.Auth__ERROR_RESET}>
                        <div className={classes.Auth__Error}>
                            {error ? <p>* {errorFormat(error.code)}</p> : null}
                            {!loading && !error && success ? <p className={classes.Auth__Error__Success}>{success}</p> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        verified: state.firebase.auth.emailVerified,
        id: state.firebase.auth.uid,
        loading: state.auth.verificationEmail.loading,
        error: state.auth.verificationEmail.error,
        success: state.auth.verificationEmail.success,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyEmailAddress: () => dispatch(actionCreator.verifyEmail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
