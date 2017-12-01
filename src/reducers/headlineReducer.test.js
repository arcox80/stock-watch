import headlineReducer from './headlineReducer';
import {fetchHeadlinesRequest, fetchHeadlinesSuccess, fetchHeadlinesFail} from '../actions';

describe('headlineReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = headlineReducer(undefined, {type: '__UNKNOWN'});
    expect(state.headlineSpinner && state.headlinesFail).toEqual(false);
    expect(state.headlines).toEqual(null);
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = headlineReducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('fetchHeadlinesRequest', () => {
    it('Should set headlineSpinner to true', () => {
      let state = { headlineSpinner: false };
      state = headlineReducer(state, fetchHeadlinesRequest());
      expect(state.headlineSpinner).toEqual(true);
    });
  });

  describe('fetchHeadlinesSuccess', () => {
    it('Should set headlineSpinner to false', () => {
      let state = { headlineSpinner: true };
      state = headlineReducer(state, fetchHeadlinesSuccess());
      expect(state.headlineSpinner).toEqual(false);
    });
  });

  describe('fetchHeadlinesFail', () => {
    it('Should set headlinesFail to true', () => {
      let state = { headlinesFail: false };
      state = headlineReducer(state, fetchHeadlinesFail());
      expect(state.headlinesFail).toEqual(true);
    });
  });
});