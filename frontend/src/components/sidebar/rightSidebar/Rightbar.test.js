import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Enzyme, { shallow, configure } from "enzyme";

import Rightbar from "./Rightbar";

configure({ adapter: new Adapter() });

describe("checking Rightbar", () => {
    it("loads a search bar and Popular Massives container when NOT on the search page", () => {
        const wrapper = shallow(<Rightbar onSearchPage={false} />);
        expect(wrapper.find("#rightbar_search-container")).toHaveLength(1);
        expect(wrapper.find("#rightbar_popular-massives")).toHaveLength(1);
    });

    it("loads neither a search bar nor a Popular Massives container when on the search page", () => {
        const wrapper = shallow(<Rightbar onSearchPage={true} />);
        expect(wrapper.find("#rightbar_search-container")).toHaveLength(0);
        expect(wrapper.find("#rightbar_popular-massives")).toHaveLength(0);
    });
});
