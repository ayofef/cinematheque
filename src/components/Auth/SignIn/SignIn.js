import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as actionCreator from "../../../store/actions/authAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classes from "../Auth.module.scss";

import { Helmet } from "react-helmet-async";
import site from "../../../assets/metaData.json";

import Google from "../../../assets/google.svg";
import Github from "../../../assets/github.svg";

import ButtonLoader from "../../UI/Utilities/Loader/ButtonLoader";
import { errorFormat } from "../../UI/Utilities/errorFormatter";

const SigninSchema = Yup.object().shape({
    email: Yup.string().required("This field is required*").email("Must be a valid email"),
    password: Yup.string().required("This field is required*").min(8, "Enter at least eight character"),
});

const SignIn = (props) => {
    const { id, loading, error } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleSubmit = (values) => {
        props.signUserIn(values);
    };

    if (id) {
        return <Redirect to={props.prevPath} />;
    }

    return (
        <div className={classes.BOXBOX}>
            <Helmet>
                <title>{site.siteMetadata.title} Sign In</title>
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
                        <p className={classes.Auth__Intro___Title}>Sign In</p>
                    </div>
                    <Formik initialValues={{ email: "", password: "" }} validationSchema={SigninSchema} onSubmit={handleSubmit}>
                        {({ isValid, dirty }) => (
                            <Form className={classes.Auth__Form}>
                                <div className={classes.Auth__Form___FormGroup}>
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" autoComplete="off" type="email" style={{ backgroundColor: "#cfdbd5" }} />
                                    <ErrorMessage name="email" component="div" />
                                </div>
                                <div className={classes.Auth__Form___FormGroup}>
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" autoComplete="off" type="password" />
                                    <ErrorMessage name="password" component="div" />
                                </div>
                                <button type="submit" disabled={!isValid || !dirty} className={classes.Auth__Form___Button}>
                                    {loading && !error ? <ButtonLoader /> : "Sign In"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div className={classes.Auth__ERROR_RESET}>
                        <div className={classes.Auth__Error}>{error ? <p>* {errorFormat(error.code)}</p> : null}</div>
                        <Link to="/reset-password" className={classes.Auth__ResetLink}>
                            Forgot Password?
                        </Link>
                    </div>
                    <div className={classes.Auth__Splitter}>
                        <hr />
                        <p>OR</p>
                        <hr />
                    </div>
                    <div className={classes.Auth__ThirdParty}>
                        <button onClick={() => props.gmail()}>
                            <span>
                                <img src={Google} alt="Google" />
                            </span>{" "}
                            Sign In with Google
                        </button>
                        <button onClick={() => props.github()}>
                            <span>
                                <img src={Github} alt="Github" />
                            </span>{" "}
                            Sign In with Github
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        id: state.firebase.auth.uid,
        loading: state.auth.signIn.loading,
        error: state.auth.signIn.error,
        prevPath: state.auth.prevPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUserIn: (credentials) => dispatch(actionCreator.signIn(credentials)),
        gmail: () => dispatch(actionCreator.signInGmail()),
        github: () => dispatch(actionCreator.signInGitHub()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
