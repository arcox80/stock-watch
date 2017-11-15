import { combineReducers } from 'redux'
import stockReducer from './stockReducer'
import headlineReducer from './headlineReducer'

export default combineReducers({
  stockReducer,
  headlineReducer
})