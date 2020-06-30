import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreator from "../../../store/actions/authAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classes from "../Auth.module.scss";

import { Helmet } from "react-helmet-async";
import site from "../../../assets/metaData.json";

import ButtonLoader from "../../UI/Utilities/Loader/ButtonLoader";
import { errorFormat } from "../../UI/Utilities/errorFormatter";

const SigninSchema = Yup.object().shape({
    email: Yup.string().required("This field is required*").email("Must be a valid email"),
});

const ResetPassword = (props) => {
    const { auth, loading, success, error } = props;

    const handleSubmit = (values) => {
        props.resetPassword(values);
    };

    if (auth) {
        return <Redirect to="/" />;
    }

    // console.log(props)
    return (
        <div className={classes.BOXBOX}>
            <Helmet>
                <title>{site.siteMetadata.title} Reset Password</title>
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
                        <p className={classes.Auth__Intro___Title}>Reset Password</p>
                    </div>
                    <Formik initialValues={{ email: "" }} validationSchema={SigninSchema} onSubmit={handleSubmit}>
                        {({ isValid, dirty }) => (
                            <Form className={classes.Auth__Form}>
                                <div className={classes.Auth__Form___FormGroup}>
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" autoComplete="on" type="email" />
                                    <ErrorMessage name="email" component="div" />
                                </div>
                                <button type="submit" disabled={!isValid || !dirty} className={classes.Auth__Form___Button}>
                                    {loading && !error ? <ButtonLoader /> : "Reset Password"}
                                </button>
                                <div className={classes.Auth__ERROR_RESET}>
                                    <div className={classes.Auth__Error}>
                                        {error ? <p>* {errorFormat(error.code)}</p> : null}
                                        {!loading && !error && success ? <p className={classes.Auth__Error__Success}>{success}</p> : null}
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth.uid,
        error: state.auth.passwordRecovery.error,
        loading: state.auth.passwordRecovery.loading,
        success: state.auth.passwordRecovery.success,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (credentials) => dispatch(actionCreator.resetPassword(credentials)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
