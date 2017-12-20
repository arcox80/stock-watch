import React from "react";
import {shallow} from "enzyme";
import App from "./App";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Headlines from "./Headlines";
import Footer from "./Footer";
import Header from "./Header";
import Intro from "./Intro";

describe("<App />", () => {
  it("Renders without crashing", () => {
    shallow(<App />);
  });

  it("Renders Header initially", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
  });

  it("Renders Intro initially", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Intro />)).toEqual(true);
  });

  it("Renders Search initially", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Search />)).toEqual(true);
  });
  
  it("Renders SearchResults initially", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<SearchResults />)).toEqual(true);
  });
  
  it("Renders Headlines initially", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Headlines />)).toEqual(true);
  });

  it("Renders Footer initially", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Footer />)).toEqual(true);
  });
});