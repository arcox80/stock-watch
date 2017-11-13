import { TOGGLE_INFO_MODAL, FETCH_STOCK_REQUEST, FETCH_STOCK_SUCCESS } from './actions';

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

export default (state, action) => {
  state = state || initialState;
  if (action.type === FIND_STOCK) {};
};