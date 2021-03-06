import React from "react";

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          React Reading List
        </a>
        <a href="/articles" className="navbar-brand">
          Saved Articles
        </a>
        <a href="/search" className="navbar-brand">
          Scrape NYT
        </a>
      </div>
    </div>
  </nav>;

export default Nav;
