import React from "react";

import classes from "./DarkModeToggler.module.scss";

const DarkModeToggler = (props) => {
  return (
    <div className={classes.wrapper}>
      <input type="checkbox" name="checkbox" className={classes.switch} onClick={props.clicked} defaultChecked={props.dark} />
    </div>
  );
};

export default DarkModeToggler;
