import React from "react";
import {connect} from "react-redux";
import Article from "./Article";

import "./headlines.css";

export class Headlines extends React.Component{
  render() {
    if (!this.props.headlines && !this.props.headlinesFail) {
      return (<div></div>);
    } else if (this.props.headlineSpinner) {
      return (
        <div className="headlines">
          <h2 className="headlines-heading">Recent News for {this.props.symbol}</h2>
          <img className="spinner" src="../../public/loading.gif" alt="Loading"/>
        </div>
      );
    } else if (this.props.headlinesFail) {
      return (
        <div className="headlines">
          <h2 className="headlines-heading">Recent News for {this.props.symbol}</h2>
          <div className="error">
            <p>I'm sorry, but we were unable to retrieve any headlines. Please make sure you entered a valid ticker symbol.</p>
            <p>If you did enter a valid ticker symbol, then the Yahoo! API is down right now. Please try again later.</p>
          </div>
        </div>
      );
    } else {
      const listItems = this.props.headlines.map((article, index) =>
        <Article key={index} {...article} />
      );
      return (
        <div className="headlines">
          <h2 className="headlines-heading">Recent News for {this.props.symbol}</h2>
          {listItems}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  symbol: state.stock.symbol,
  headlineSpinner: state.headline.headlineSpinner,
  headlinesFail: state.headline.headlinesFail,
  headlines: state.headline.headlines
});

export default connect(mapStateToProps)(Headlines);