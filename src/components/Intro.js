import React from "react";
import {connect} from "react-redux";

import "./intro.css";

export class Intro extends React.Component {
  render() {
    if (this.props.symbol) {
      return (<div></div>);
    } else {
      return (
        <div className="intro">
          <div className="intro-content">
            <h1>Welcome to the Stock-Watch Search page!</h1>
            <p>All you need to do is enter a company’s stock symbol, and we will retrieve up-to-date prices as well as recent news headlines about the company.</p>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  symbol: state.stock.symbol,
});

export default connect(mapStateToProps)(Intro);