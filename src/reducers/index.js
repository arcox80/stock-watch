import { combineReducers } from "redux";
import stock from "./stockReducer";
import headline from "./headlineReducer";

export default combineReducers({
  stock,
  headline
});