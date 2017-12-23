import React from "react";
import {shallow, mount} from "enzyme";
import {SearchResults} from "./SearchResults";


describe("<SearchResults />", () => {
  it("Renders without crashing", () => {
    shallow(<SearchResults />);
  });
  
  it("Renders an empty div initially", () => {
    const wrapper = shallow(<SearchResults />);
    wrapper.setProps({ symbol: null });
    expect(wrapper.text()).toEqual("");
  });

  it("Renders a spinner when stockSpinner is true", () => {
    const wrapper = shallow(<SearchResults />);
    wrapper.setProps({ symbol: "IBM", stockSpinner: true });
    expect(wrapper.find("h2").text()).toEqual(`${props.symbol} Stock Information`);
    expect(wrapper.find("img").hasClass("spinner")).toEqual(true);
  });

  const props = {
    symbol: "IBM",
    currentValue: "152.96",
    change: "0.90",
    currentTimeOfQuote: "Nov 29, 1:23 PM",
    weekStartingValue: "151.84",
    oneMonthValue: "153.68",
    threeMonthValue: "145.16",
    yearValue: "163.51"
  };

  it("Renders data once received", () => {
    const wrapper = shallow(<SearchResults />);
    wrapper.setProps(props);
    expect(wrapper.find("h2").text()).toEqual(`${props.symbol} Stock Information`);
    expect(wrapper.find(".js-currentValue").text()).toEqual(`${props.currentValue} USD`);
    expect(wrapper.find(".js-change").text()).toEqual(props.change);
    expect(wrapper.find(".timestamp").text()).toEqual(props.currentTimeOfQuote);
    expect(wrapper.find(".js-weekStart").text()).toEqual(`${props.weekStartingValue} USD`);
    expect(wrapper.find(".js-oneMonth").text()).toEqual(`${props.oneMonthValue} USD`);
    expect(wrapper.find(".js-threeMonths").text()).toEqual(`${props.threeMonthValue} USD`);
    expect(wrapper.find(".js-oneYear").text()).toEqual(`${props.yearValue} USD`);
  });
});