import React from "react";
import Banner from "../../components/LandingCarousel/LandingCarousel";
import { Trending, TrendingTV, Popular, TopRated, Upcoming, PopularTV, TopRatedTV } from "../../components/HomeSections/HomeSections";
import { Helmet } from "react-helmet-async";

import site from "../../assets/metaData";
const Home = () => {
    return (
        <>
            <Helmet>
                <html lang="en" />
                <title>{site.siteMetadata.title} Home</title>
                <meta name="google-site-verification" content="1PzEhgav7N4Baqikr-U-7dtjHbNRw5OiIuPtWKZABHU" />
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

            <Banner />
            <div className="container">
                <Trending />
                <TrendingTV />
                <Popular />
                <PopularTV />
                <TopRated />
                <TopRatedTV />
                <Upcoming />
            </div>
        </>
    );
};

export default Home;
