import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={`container ${classes.loader}`}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
