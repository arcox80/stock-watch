import React from "react";
import {connect} from "react-redux";
import {fetchStock, fetchHeadlines} from "../actions";

import "./search.css";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.submitStock = this.submitStock.bind(this);
  }

  submitStock(event) {
    event.preventDefault();
    const value = event.target.querySelector("input").value;
    this.props.dispatch(fetchStock(value));
    this.props.dispatch(fetchHeadlines(value));
    event.target.querySelector("input").value = "";        
  }

  render() {
    return (
      <form onSubmit={this.submitStock}>
        <input type="text" name="userSearch" id="userSearch"
          className="text" autoComplete="off"
          placeholder="Enter the Company's Stock Symbol" required
        />
        <input type="submit" id="searchButton" className="button" name="submit" value="Submit"/>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  stockSpinner: state.stock.stockSpinner,
  headlineSpinner: state.headline.headlineSpinner,
  symbol: state.stock.symbol
});

export default connect(mapStateToProps)(Search);