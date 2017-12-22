import React from "react";
import {shallow, mount} from "enzyme";
import {Search} from "./Search";
import * as actions from "../actions";

describe("<Search />", () => {
  it("Renders without crashing", () => {
    shallow(<Search />);
  });

  it("It should fire the dispatches when the form is submitted", () => {
    const dispatch = jest.fn();
    const stockSpy = jest.spyOn(actions, "fetchStock");
    const headlinesSpy = jest.spyOn(actions, "fetchHeadlines");
    const wrapper = mount(<Search dispatch={dispatch} />);
    const value = "ibm";
    wrapper.find('input[type="text"]').instance().value = value;
    wrapper.find("form").simulate("submit");
    expect(dispatch).toHaveBeenCalled();
    expect(stockSpy).toHaveBeenCalledWith(value);
    expect(headlinesSpy).toHaveBeenCalledWith(value);
  });
  
  it("Should reset the input when the form is submitted", () => {
    const wrapper = mount(<Search dispatch={() => {}}/>);
    const input = wrapper.find('input[type="text"]');
    input.instance().value = "ibm";
    wrapper.find("form").simulate("submit");
    expect(input.instance().value).toEqual("");
  });
});