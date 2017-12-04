import React from "react";
import {shallow, mount} from "enzyme";
import {Search} from "./Search";
import {fetchStockRequest, fetchHeadlinesRequest} from "../actions";

const mockFetchStockAction = {
  type: "FETCH_STOCK"
};
jest.mock("../actions", () => Object.assign({},
  require.requireActual("../actions"),
  {
    fetchStock: jest.fn().mockImplementation(() => {
      return mockFetchStockAction;
    })
  }
));

const mockFetchHeadlinesAction = {
  type: "FETCH_HEADLINES"
};
jest.mock("../actions", () => Object.assign({},
  require.requireActual("../actions"),
  {
    fetchHeadlines: jest.fn().mockImplementation(() => {
      return mockFetchHeadlinesAction;
    })
  }
));

describe("<Search />", () => {
  it("Renders without crashing", () => {
    shallow(<Search />);
  });

  it("It should fire the dispatches when the form is submitted", () => {
    const dispatch = jest.fn();
    const wrapper = mount(<Search dispatch={dispatch} />);
    const value = "ibm";
    wrapper.find('input[type="text"]').instance().value = value;
    wrapper.find("form").simulate("submit");
    expect(dispatch).toHaveBeenCalledWith(
      mockFetchHeadlinesAction, mockFetchStockAction, fetchHeadlinesRequest(), fetchStockRequest()
    );
  });
  
  it("Should reset the input when the form is submitted", () => {
    const wrapper = mount(<Search dispatch={() => {}}/>);
    const input = wrapper.find('input[type="text"]');
    input.instance().value = "ibm";
    wrapper.find("form").simulate("submit");
    expect(input.instance().value).toEqual("");
  });
});