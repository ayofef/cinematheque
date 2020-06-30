import React from "react";
import LazyLoad from "react-lazyload";
import Loader from "../Utilities/Loader/ImgLoader";
import MovieSvg from "../../../assets/technology.svg";

const baseUrl = "https://image.tmdb.org/t/p/";

export const Backdrop = ({ id, title }) => {
    return (
        <LazyLoad height={300} offset={50} once={true} placeholder={<Loader />}>
            <img style={{ width: "100%", height: "100%", objectPosition: "50% 0%", objectFit: "cover", filter: "brightness(50%)" }} src={`${baseUrl}w780${id}`} alt={title} />
        </LazyLoad>
    );
};

export const Img = ({ id, title, style }) => {
    return (
        <LazyLoad height={300} offset={50} once={true} placeholder={<Loader />}>
            <img
                className={style}
                src={id ? `${baseUrl}w780${id}` : MovieSvg} // Upcoming movies that dont have a poster yet returns null, instead of a broken image show an svg placeholder instead
                alt={title}
                title={title}
            />
        </LazyLoad>
    );
};

export const NoImg = ({ id, title, style }) => {
    return (
        <div className={style} style={{ backgroundColor: "#cfdbd5" }}>
            <img
                style={{
                    width: "100%",
                }}
                src={MovieSvg} // Upcoming movies that dont have a poster yet returns null, instead of a broken image show an svg placeholder instead
                alt={title}
                title={title}
            />
            <p
                style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#393e41",
                }}
            >
                {title}
            </p>
        </div>
    );
};
