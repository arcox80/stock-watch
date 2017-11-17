import React from 'react';
import {connect} from 'react-redux';
import Article from './article';

//import '../headlines.css';

export function Headlines(props) {
  if (props.headlines.length === 0) {
    return (<div></div>);
  } else if (props.headlineSpinner) {
    return (
      <div>
        <h2>Recent News for {props.symbol}</h2>
        <img src="../../public/loading.gif" alt="Loading"/>
      </div>
    );
  } else {
    const listItems = props.headlines.map((article, index) =>
    <Article key={index} {...article} />
    );
    return (
      <div>
        <h2>Recent News for {this.props.symbol}</h2>
        {listItems}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  symbol: state.stock.symbol,
  stockSpinner: state.headline.headlineSpinner,
  headlines: state.headline.headlines
});

export default connect(mapStateToProps)(Headlines);