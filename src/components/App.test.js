import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Search from './Search';
import SearchResults from './SearchResults';
import Headlines from './Headlines';

describe('<App />', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });

  it('Renders Search initially', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Search />)).toEqual(true);
  });
  
  it('Renders SearchResults initially', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<SearchResults />)).toEqual(true);
  });
  
  it('Renders Headlines initially', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Headlines />)).toEqual(true);
  });
});