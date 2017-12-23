import React from "react";
import { shallow, mount } from "enzyme";
import { Headlines } from "./Headlines";
import Article from "./Article";

describe("<Headlines />", () => {
  it("Renders without crashing", () => {
    shallow( < Headlines / > );
  });

  it("Renders an empty div initially", () => {
    const wrapper = shallow( < Headlines / > );
    expect(wrapper.text()).toEqual("");
  });

  it("Renders a spinner when headlineSpinner is true", () => {
    const wrapper = shallow( < Headlines / > );
    wrapper.setProps({
      symbol: "IBM",
      headlineSpinner: true,
      headlines: []
    });
    expect(wrapper.find("h2").text()).toEqual(`Recent News for ${props.symbol}`);
    expect(wrapper.find("img").hasClass("spinner")).toEqual(true);
  });

  const props = {
    symbol: "IBM",
    headlines: [{
      title: "Title",
      link: "/link",
      description: "Description Text"
    },
    {
      title: "Title2",
      link: "/link2",
      description: "Another Description Text"
    }]
  };

  it("Renders Article component once data is received", () => {
    const wrapper = shallow( < Headlines / > );
    wrapper.setProps(props);
    expect(wrapper.find("h2").text()).toEqual(`Recent News for ${props.symbol}`);
    expect(wrapper.containsMatchingElement( < Article / > )).toEqual(true);
  });
});