import React from "react";
import {connect} from "react-redux";

import "./searchresults.css";

export class SearchResults extends React.Component {
  render() {
    if (!this.props.symbol) {
      return (<div></div>);
    } else if (this.props.stockSpinner) {
      return (
        <div>
          <h2>{this.props.symbol} Stock Information</h2>
          <img className="spinner" src="../../public/loading.gif" alt="Loading"/>
        </div>
      );
    } else if (this.props.stockFail) {
      return (
        <div>
          <p>Sorry, the Alpha Vantage API is down right now. Please try again later.</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{this.props.symbol} Stock Information</h2>
          <h3>Current Value: {this.props.currentValue} USD</h3>
          <h4>Today's Change: {this.props.change}</h4>
          <span>{this.props.currentTimeOfQuote}</span>
          <p>Value at Beginning of Week: {this.props.weekStartingValue}</p>
          <p>Value 1 Month Ago: {this.props.oneMonthValue}</p>
          <p>Value 3 Months Ago: {this.props.threeMonthValue}</p>
          <p>Value 1 Year Ago: {this.props.yearValue}</p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  symbol: state.stock.symbol,
  stockSpinner: state.stock.stockSpinner,
  stockFail: state.stock.stockFail,
  currentTimeOfQuote: state.stock.currentTimeOfQuote,
  currentValue: state.stock.currentValue,
  startingValue: state.stock.startingValue,
  change: state.stock.change,
  weekStartingValue: state.stock.weekStartingValue,
  oneMonthValue: state.stock.oneMonthValue,
  threeMonthValue: state.stock.threeMonthValue,
  yearValue: state.stock.yearValue,
});

export default connect(mapStateToProps)(SearchResults);