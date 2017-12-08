import React from "react";
import {shallow, mount} from "enzyme";
import Article from "./Article";


describe("<Article />", () => {
  it("Renders without crashing", () => {
    shallow(<Article />);
  });

  const props = {
    link: "https://finance.yahoo.com/news",
    title: "The 15 Most Influential Websites of All Time",
    description: "They drove the world wide web's evolution."
  };

  it("Renders the data correctly", () => {
    const wrapper = shallow(<Article />);
    wrapper.setProps(props);
    expect(wrapper.find("a").props().href).toEqual(props.link);
    expect(wrapper.find("h4").text()).toEqual(props.title);
    expect(wrapper.find("p").text()).toEqual(props.description);
  });
});