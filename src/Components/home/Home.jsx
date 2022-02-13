import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { tabs } from "../../DATA/data";
import classes from "./Home.module.css";

const Home = ({ loginStatus }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const history = useHistory();

  const logoClickHandler = (e) => {
    e.preventDefault();
    history.replace("/showideas");
    setActiveTab("tab1");
  };

  // based on the data passed in tabs number of tab will be displayed on navbar
  const showTabs = tabs.map((tab) => {
    return (
      <Link key={tab.id} className="router-link" to={`/${tab.path}`}>
        <li key={tab.id} className="nav-item me-2">
          <a
            className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
            aria-current="page"
            id={tab.id}
            href="#"
          >
            {tab.title}
          </a>
        </li>
      </Link>
    );
  });

  // Attacting event handler to parent (ul) instead of (li) to prevent multiple event handlers in memory which help in memory management
  const changeTabHandler = (e) => {
    setActiveTab(e.target.id);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark mb-3 fixed-top  opacity-75 ${classes.navbarContainer}`}
    >
      <div className="container">
        <a onClick={logoClickHandler} className="navbar-brand" href="/">
          Hack<small className="text-primary">Ideas</small>
        </a>

        <ul
          className="navbar-nav nav-pills nav-fill ms-auto mb-2 mb-lg-0"
          onClick={changeTabHandler}
        >
          {loginStatus && showTabs}
        </ul>
      </div>
    </nav>
  );
};

export default Home;
