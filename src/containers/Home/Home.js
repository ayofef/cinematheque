import React from 'react';
import Banner from "../../components/LandingCarousel/LandingCarousel";
import { Latest, Popular, TopRated, Upcoming } from "../../components/HomeSections/HomeSections";

const Home = () =>{

    return(
        <>
            <Banner />
            <div className="container">
                <Latest />
                <Popular />
                <TopRated />
                <Upcoming />
            </div>
        </>
    )
}

export default Home;