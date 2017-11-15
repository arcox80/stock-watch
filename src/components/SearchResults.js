import React from 'react';
import {connect} from 'react-redux';

//import '../searchresults.css';

export function SearchResults(props) {
  if (props.stockSpinner) {
    return (
      <div>
        <img src="../../public/loading.gif" alt="Loading"/>
      </div>
    );
  }
  return (
    <div>
      <h2>{props.symbol} Stock Information</h2>
      <h3>Current Value: {props.currentValue} USD</h3>
      <h4>Today's Change: {props.change}</h4>
      <span>{props.currentTimeOfQuote}</span>
      <p>Value at Beginning of Week: {props.weekStartingValue}</p>
      <p>Value 1 Month Ago: {props.oneMonthValue}</p>
      <p>Value 3 Months Ago: {props.threeMonthValue}</p>
      <p>Value 1 Year Ago: {props.yearValue}</p>
    </div>
  );
}

const mapStateToProps = state => ({
  symbol: state.symbol,
  currentTimeOfQuote: state.currentTimeOfQuote,
  currentValue: state.currentValue,
  startingValue: state.startingValue,
  change: state.change,
  weekStartingValue: state.weekStartingValue,
  oneMonthValue: state.oneMonthValue,
  threeMonthValue: state.threeMonthValue,
  yearValue: state.yearValue,
});

export default connect(mapStateToProps)(SearchResults);