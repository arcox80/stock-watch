import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {stockReducer} from './reducer';

export default createStore(stockReducer, applyMiddleware(thunk));