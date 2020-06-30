import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/actions/authAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import classes from "../Auth.module.scss";

import { Helmet } from "react-helmet-async";
import site from "../../../assets/metaData.json";

import ButtonLoader from "../../UI/Utilities/Loader/ButtonLoader";
import { errorFormat } from "../../UI/Utilities/errorFormatter";

const SignUpSchema = Yup.object().shape({
    email: Yup.string().required("This field is required").email("Must be a valid email"),
    password: Yup.string().required("This field is required").min(8, "Enter at least eight character"),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
    firstName: Yup.string().required("This field is required").min(2, "Enter a valid first name"),
    lastName: Yup.string().required("This field is required").min(2, "Enter a valid last name"),
});

const SignUp = (props) => {
    const { id, loading, error } = props;

    const handleSubmit = (values) => {
        props.createUser(values);
    };

    if (id) {
        return <Redirect to="/sign-in" />;
    }

    return (
        <div className={classes.BOXBOX}>
            <Helmet>
                <title>{site.siteMetadata.title} Sign Up</title>
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
                        <p className={classes.Auth__Intro___Title}>Sign Up</p>
                    </div>
                    <Formik initialValues={{ email: "", password: "", passwordConfirm: "", firstName: "", lastName: "" }} validationSchema={SignUpSchema} onSubmit={handleSubmit}>
                        {({ isValid, dirty }) => (
                            <Form className={classes.Auth__Form}>
                                <div className={classes.Auth__Form___FormGroup}>
                                    <label htmlFor="firstName">First Name</label>
                                    <Field name="firstName" autoComplete="on" type="text" />
                                    <ErrorMessage name="firstName" component="div" />
                                </div>
                                <div className={classes.Auth__Form___FormGroup}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field name="lastName" autoComplete="on" type="text" />
                                    <ErrorMessage name="lastName" component="div" />
                                </div>
                                <div className={classes.Auth__Form___FormGroup}>
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" autoComplete="on" type="email" />
                                    <ErrorMessage name="email" component="div" />
                                </div>
                                <div className={classes.Auth__Form___FormGroup}>
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" autoComplete="off" type="password" />
                                    <ErrorMessage name="password" component="div" />
                                </div>
                                <div className={classes.Auth__Form___FormGroup}>
                                    <label htmlFor="passwordConfirm">Confirm Password</label>
                                    <Field name="passwordConfirm" autoComplete="off" type="password" />
                                    <ErrorMessage name="passwordConfirm" component="div" />
                                </div>
                                <button type="submit" disabled={!isValid || !dirty} className={classes.Auth__Form___Button}>
                                    {loading && !error ? <ButtonLoader /> : "Sign Up"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div className={classes.Auth__ERROR_RESET}>
                        <div className={classes.Auth__Error}>{error ? <p>* {errorFormat(error.code)}</p> : null}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        id: state.firebase.auth.uid,
        loading: state.auth.signUp.loading,
        error: state.auth.signUp.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (newUser) => dispatch(actionCreator.signUp(newUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
