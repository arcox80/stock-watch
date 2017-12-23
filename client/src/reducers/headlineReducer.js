import * as actions from "../actions";

const initialState = {
  headlineSpinner: false,
  headlinesFail: false,
  headlines: null
};

export default function headline(state=initialState, action) {
  if (action.type === actions.FETCH_HEADLINES_REQUEST) {
    return Object.assign({}, initialState, { headlineSpinner: true });
  } else if (action.type === actions.FETCH_HEADLINES_FAIL) {
    return Object.assign({}, state, { headlinesFail: true, headlineSpinner: false });
  } else if (action.type === actions.FETCH_HEADLINES_SUCCESS) {
    return Object.assign({}, state, { headlineSpinner: false }, {
      headlines: action.headlineData
    });
  } 
  return state;
}