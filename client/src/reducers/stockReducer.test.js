import stockReducer from "./stockReducer";
import {fetchStockRequest, fetchStockSuccess, fetchStockFail} from "../actions";

describe("stockReducer", () => {
  it("Should set the initial state when nothing is passed in", () => {
    const state = stockReducer(undefined, {type: "__UNKNOWN"});
    expect(state.stockSpinner && state.stockFail).toEqual(false);
    expect( state.symbol && 
            state.currentTimeOfQuote &&
            state.currentValue &&
            state.startingValue &&
            state.change &&
            state.weekStartingValue &&
            state.oneMonthValue &&
            state.yearValue
    ).toEqual(null);
  });

  it("Should return the current state on an unknown action", () => {
    let currentState = {};
    const state = stockReducer(currentState, {type: "__UNKNOWN"});
    expect(state).toBe(currentState);
  });

  describe("fetchStockRequest", () => {
    it("Should set stockSpinner to true", () => {
      let state = { stockSpinner: false };
      const value = "ibm";
      state = stockReducer(state, fetchStockRequest(value));
      expect(state.stockSpinner).toEqual(true);
      expect(state.symbol).toEqual("IBM");
    });
  });

  describe("fetchStockSuccess", () => {
    it("Should set stockSpinner to false", () => {
      let state = { stockSpinner: true };
      state = stockReducer(state, fetchStockSuccess());
      expect(state.stockSpinner).toEqual(false);
    });
  });

  describe("fetchStockfail", () => {
    it("Should set stockFail to true", () => {
      let state = { stockFail: false };
      state = stockReducer(state, fetchStockFail());
      expect(state.stockFail).toEqual(true);
    });
  });
});