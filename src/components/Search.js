import React from 'react';
import {connect} from 'react-redux';

import {fetchStockRequest, fetchStock, fetchHeadlinesRequest, fetchHeadlines} from '../actions';

import './search.css';

export class Search extends React.Component {
  submitStock(event) {
      event.preventDefault();
      this.props.dispatch(fetchStockRequest());
      this.props.dispatch(fetchHeadlinesRequest());
      let value = event.target.querySelector('input').value;
      this.props.dispatch(fetchStock(value));
      this.props.dispatch(fetchHeadlines(value));
      value = '';        
  }

  render() {
      return (
          <form onSubmit={e => this.submitStock(e)}>
              <input type="text" name="userSearch" id="userSearch"
                  className="text" autoComplete="off"
                  placeholder="Enter the Company's Stock Symbol" required
              />
              <input type="submit" id="searchButton" className="button" name="submit" value="Submit"/>
          </form>
      );
  }
};

const mapStateToProps = state => ({
  stockSpinner: state.stockSpinner,
  headlineSpinner: state.headlineSpinner,
  symbol: state.symbol
});

export default connect(mapStateToProps)(Search);