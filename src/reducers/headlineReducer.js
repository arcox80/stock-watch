import * as actions from '../actions';

const initialState = {
  headlineSpinner: false,
  headlines: []
};

export default function headline(state=initialState, action) {
  if (action.type === actions.FETCH_HEADLINES_REQUEST) {
    return Object.assign({}, state, {
      headlineSpinner: true
    });
  } else if (action.type === actions.FETCH_HEADLINES_SUCCESS) {
    return Object.assign({}, state, { headlineSpinner: false }, {
      headlines: [action.headlineData] 
    });
  }
  return state;
};