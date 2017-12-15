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
          <h2 className="stock-heading">{this.props.symbol} Stock Information</h2>
          <img className="spinner" src="../../public/loading.gif" alt="Loading"/>
        </div>
      );
    } else if (this.props.stockFail) {
      return (
        <div>
          <h2 className="stock-heading" style={{ marginBottom: 10 }}>
            {this.props.symbol} Stock Information
          </h2>
          <div className="error">
            <p>Sorry, the Alpha Vantage API is down right now. Please try again later.</p>
          </div>
        </div>
      );
    } else if (this.props.error) {
      return (
        <div>
          <h2 className="stock-heading" style={{ marginBottom: 10 }}>
            {this.props.symbol} Stock Information
          </h2>
          <div className="error">
            <p>{this.props.error[0]}</p>
            <p>{this.props.error[1]}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="search-results">
          <h2 className="stock-heading">{this.props.symbol} Stock Information</h2>
          <span className="timestamp">{this.props.currentTimeOfQuote}</span>
          <div className="grid-cube current-value">
            <h3>Current Value</h3>
            <span>{this.props.currentValue} USD</span>
          </div>
          <div className="grid-cube todays-change">
            <h3>Today's change</h3>
            <span className={(this.props.change < 0) ? "red-highlight" : null}>
              {this.props.change}
            </span>
          </div>
          <div className="grid-cube data beginning-week">
            <h4>Beginning of Week</h4>
            <span>{this.props.weekStartingValue} USD</span>
          </div>
          <div className="grid-cube data one-month">
            <h4>1 Month Ago</h4>
            <span>{this.props.oneMonthValue} USD</span>
          </div>
          <div className="grid-cube data three-months">
            <h4>3 Months Ago</h4>
            <span>{this.props.threeMonthValue} USD</span>
          </div>
          <div className="grid-cube data one-year">
            <h4>1 Year Ago</h4>
            <span>{this.props.yearValue} USD</span>
          </div>
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
  error: state.stock.error
});

export default connect(mapStateToProps)(SearchResults);