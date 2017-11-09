import { TOGGLE_INFO_MODAL, FIND_STOCK } from './actions';

const initialState = {
  symbol: null,
  currentValue: null,
  startingValue: null,
  change: null,
  threeMonthValue: null,
  yearValue: null,
  headlines: []
};

export default (state, action) => {
  state = state || initialState;
  if (action.type === FIND_STOCK) {};
};