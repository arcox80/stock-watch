import React from "react";
import "./footer.css";

export default function Footer(props) {
  return (
    <footer>
      <div className="footer-container">
        <p className="grid-1"><a className="logo" href="./index.html">$tock-Watch</a></p>
        <p className="grid-2">Thanks for visiting the Stock-Watch Search Page!</p>
        <div className="grid-3">
          <p>This page was made possible by the following:</p>
          <span><a href="https://developer.nytimes.com/">Alpha Vantage API</a> | </span>
          <span><a href="https://developer.yahoo.com/finance/">Yahoo! RSS Feeds</a></span>
        </div>
        <p className="grid-4">Click <a href="./index.html">here</a> to see my portfolio page.</p>
        <p className="grid-6">Contact:
          <a href="https://www.linkedin.com/in/andrew-cox-4b22b79a">
            <span className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x fa-inverse"></i><i className="fa fa-linkedin fa-stack-1x"></i>
            </span>
          </a>
          <a href="https://github.com/arcox80">
            <span className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x"></i><i className="fa fa-github fa-stack-2x fa-inverse"></i>
            </span>
          </a>
        </p>
        <p className="grid-5">&copy; 2017 Stock-Watch Page</p>
      </div>
    </footer>
  );
}