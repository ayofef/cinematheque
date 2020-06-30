import React from "react";
import classes from "./Casts.module.scss";

import AVATAR from "../../../../assets/avatar.svg";

const Casts = ({ title, img, name }) => {
  if (img) {
    return (
      <div className={classes.Casts}>
        <img src={`https://image.tmdb.org/t/p/w185/${img}`} alt={[title, name].join(" | ")} title={name} />
      </div>
    );
  }
  return (
    <div className={classes.Casts__Avatar}>
      <img src={AVATAR} alt={[title, name].join(" | ")} title={name} />
    </div>
  );
};

export default Casts;
