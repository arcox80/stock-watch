import * as actions from './actions';

const initialState = {
  stockSpinner: false,
  headlineSpinner: false,
  symbol: null,
  currentTimeOfQuote: null,
  currentValue: null,
  startingValue: null,
  change: null,
  weekStartingValue: null,
  oneMonthValue: null,
  threeMonthValue: null,
  yearValue: null,
  headlines: []
};

export const stockReducer = (state=initialState, action) => {
  if (action.type === actions.FETCH_STOCK_REQUEST) {
    return Object.assign({}, state, {
      stockSpinner: true
    });
  } else if (action.type === actions.FETCH_STOCK_SUCCESS) {
    return Object.assign({}, state, { stockSpinner: false }, action.stockData);
  }
  return state;
};

export const headlineReducer = (state=initialState, action) => {
  if (action.type === actions.FETCH_HEADLINES_REQUEST) {
    return Object.assign({}, state, {
      headlineSpinner: true
    });
  } else if (action.type === actions.FETCH_HEADLINES_SUCCESS) {
    return Object.assign({}, state, { headlineSpinner: false }, action.headlineData);
  }
  return state;
};