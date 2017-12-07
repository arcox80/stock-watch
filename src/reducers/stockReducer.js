import * as actions from "../actions";

const initialState = {
  stockSpinner: false,
  stockFail: false,
  symbol: null,
  currentTimeOfQuote: null,
  currentValue: null,
  startingValue: null,
  change: null,
  weekStartingValue: null,
  oneMonthValue: null,
  threeMonthValue: null,
  yearValue: null,
};

export default function stock(state=initialState, action) {
  if (action.type === actions.FETCH_STOCK_REQUEST) {
    return Object.assign({}, state, { stockSpinner: true, symbol: action.value.toUpperCase() });
  } else if (action.type === actions.FETCH_STOCK_FAIL) {
    return Object.assign({}, state, { stockFail: true, stockSpinner: false });
  } else if (action.type === actions.FETCH_STOCK_SUCCESS) {
    return Object.assign({}, state, { stockSpinner: false }, 
      action.stockData
    );
  } 
  return state;
}