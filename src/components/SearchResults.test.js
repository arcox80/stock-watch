import React from 'react';
import {shallow, mount} from 'enzyme';
import {SearchResults} from './SearchResults';


describe('<SearchResults />', () => {
  it('Renders without crashing', () => {
    shallow(<SearchResults />);
  });
  
  it('Renders an empty div initially', () => {
    const wrapper = shallow(<SearchResults />);
    wrapper.setProps({ symbol: null });;
    expect(wrapper.text()).toEqual('');
  });

  it('Renders a spinner when stockSpinner is true', () => {
    const wrapper = shallow(<SearchResults />);
    wrapper.setProps({ symbol: 'IBM', stockSpinner: true });;
    expect(wrapper.find('h2').text()).toEqual(`${props.symbol} Stock Information`);
    expect(wrapper.find('img').hasClass('spinner')).toEqual(true);
  });

  const props = {
    symbol: 'IBM',
    currentValue: '152.96',
    change: '0.90',
    currentTimeOfQuote: 'Nov 29, 1:23 PM',
    weekStartingValue: '151.84',
    oneMonthValue: '153.68',
    threeMonthValue: '145.16',
    yearValue: '163.51'
  };

  it('Renders data once received', () => {
    const wrapper = shallow(<SearchResults />);
    wrapper.setProps(props);;
    expect(wrapper.find('h2').text()).toEqual(`${props.symbol} Stock Information`);
    expect(wrapper.find('h3').text()).toEqual(`Current Value: ${props.currentValue} USD`);
    expect(wrapper.find('h4').text()).toEqual(`Today's Change: ${props.change}`);
    expect(wrapper.find('span').text()).toEqual(props.currentTimeOfQuote);
    expect(wrapper.find('p').first().text()).toEqual(`Value at Beginning of Week: ${props.weekStartingValue}`);
    expect(wrapper.find('p').at(1).text()).toEqual(`Value 1 Month Ago: ${props.oneMonthValue}`);
    expect(wrapper.find('p').at(2).text()).toEqual(`Value 3 Months Ago: ${props.threeMonthValue}`);
    expect(wrapper.find('p').last().text()).toEqual(`Value 1 Year Ago: ${props.yearValue}`);
  });
});