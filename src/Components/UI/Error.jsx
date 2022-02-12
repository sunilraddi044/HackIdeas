import React from "react";
import classes from "./Error.module.css";

const Error = ({ msg }) => {
  console.log("error", msg);
  return (
    <div className={`container ${classes["error-container"]}`}>
      <p className="text-center text-light">{msg}</p>
    </div>
  );
};

export default Error;
