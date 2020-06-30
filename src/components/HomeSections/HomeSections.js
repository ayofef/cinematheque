import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import Markup from "./Markup";
import { Redirect } from "react-router-dom";
import { faStar, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faFire, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../UI/Utilities/Loader/Loader";

const IconStyle = {
    transform: "translateY(.2rem)",
    height: "2.5rem",
    marginRight: "1rem",
};

export const Trending = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const section = "movie";

    useEffect(() => {
        if (!data) {
            axios
                .get("/trending/movie/day", {
                    params: {
                        page: 1,
                    },
                })
                .then((res) => {
                    const data = res.data.results;
                    setData(data.slice(0, 5));
                })
                .catch((err) => {
                    setError(err.response.status || "{0}");
                });
        }
    });

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data) {
        return (
            <Markup heading="Trending Movies" data={data} path="/movie/trending/1" section={section}>
                <FontAwesomeIcon style={IconStyle} icon={faChartLine} />
            </Markup>
        );
    }

    return <Loader />;
};
export const TrendingTV = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const section = "tv";

    useEffect(() => {
        if (!data) {
            axios
                .get("/trending/tv/day", {
                    params: {
                        page: 1,
                    },
                })
                .then((res) => {
                    const data = res.data.results;
                    setData(data.slice(0, 5));
                })
                .catch((err) => {
                    console.log("ERROR:", err.response);
                    setError(err.response.status || "{0}");
                });
        }
    });

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data) {
        return (
            <Markup heading="Trending Tv Series" data={data} path="/tv/trending/1" section={section}>
                <FontAwesomeIcon style={IconStyle} icon={faChartLine} />
            </Markup>
        );
    }

    return <Loader />;
};
export const TopRated = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const section = "movie";

    useEffect(() => {
        if (!data) {
            axios
                .get("/movie/top_rated")
                .then((res) => {
                    const data = res.data.results;
                    setData(data.slice(0, 5));
                })
                .catch((err) => {
                    console.log("ERROR:", err.response);
                    setError(err.response.status || "{0}");
                });
        }
    });

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data) {
        return (
            <Markup heading="Top Rated Movies" data={data} path="/movie/top-rated/1" section={section}>
                <FontAwesomeIcon style={IconStyle} icon={faStar} />
            </Markup>
        );
    }

    return <Loader />;
};
export const TopRatedTV = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const section = "tv";

    useEffect(() => {
        if (!data) {
            axios
                .get("/tv/top_rated")
                .then((res) => {
                    const data = res.data.results;
                    setData(data.slice(0, 5));
                })
                .catch((err) => {
                    console.log("ERROR:", err.response);
                    setError(err.response.status || "{0}");
                });
        }
    });

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data) {
        return (
            <Markup heading="Top Rated Tv Series" data={data} path="/tv/top-rated/1" section={section}>
                <FontAwesomeIcon style={IconStyle} icon={faStar} />
            </Markup>
        );
    }

    return <Loader />;
};

export const Popular = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const section = "movie";

    useEffect(() => {
        if (!data) {
            axios
                .get("/movie/popular")
                .then((res) => {
                    const data = res.data.results;
                    setData(data.slice(0, 5));
                })
                .catch((err) => {
                    console.log("ERROR:", err.response);
                    setError(err.response.status || "{0}");
                });
        }
    });

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data) {
        return (
            <Markup heading="Popular Movies" data={data} path="/movie/popular/1" section={section}>
                <FontAwesomeIcon style={IconStyle} icon={faFire} />
            </Markup>
        );
    }

    return <Loader />;
};

export const PopularTV = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const section = "tv";

    useEffect(() => {
        if (!data) {
            axios
                .get("/tv/popular")
                .then((res) => {
                    const data = res.data.results;
                    setData(data.slice(0, 5));
                })
                .catch((err) => {
                    console.log("ERROR:", err.response);
                    setError(err.response.status || "{0}");
                });
        }
    });

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data) {
        return (
            <Markup heading="Popular Tv Series" data={data} path="/tv/popular/1" section={section}>
                <FontAwesomeIcon style={IconStyle} icon={faFire} />
            </Markup>
        );
    }

    return <Loader />;
};

export const Upcoming = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const section = "movie";

    useEffect(() => {
        if (!data) {
            axios
                .get("/movie/upcoming", {
                    params: {
                        page: 2,
                    },
                })
                .then((res) => {
                    const data = res.data.results;
                    setData(data.slice(0, 5));
                })
                .catch((err) => {
                    console.log("ERROR:", err.response);
                    setError(err.response.status || "{0}");
                });
        }
    });

    if (error) {
        return <Redirect to="/error" />;
    }

    if (data) {
        return (
            <Markup heading="Upcoming Movies" data={data} path="/movie/upcoming/1" section={section}>
                <FontAwesomeIcon style={IconStyle} icon={faCalendar} />
            </Markup>
        );
    }

    return <Loader />;
};
