import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Enzyme, { shallow, configure } from "enzyme";

import Sidebar from "./Sidebar";
import SidebarButton from "../../parts/SidebarButton";

configure({ adapter: new Adapter() });

describe("checking the Sidebar works properly", () => {
    const userInfo = { user: "someUser", jwt: "abcdefg" };

    let wrapper;
    let thinWrapper;
    beforeEach(() => {
        wrapper = shallow(<Sidebar auth={userInfo} />);
        thinWrapper = shallow(<Sidebar shrink={true} auth={userInfo} />);
    });

    it("renders 6 buttons", () => {
        expect(wrapper.find(SidebarButton)).toHaveLength(6);
        expect(thinWrapper.find(SidebarButton)).toHaveLength(6);
    });
});
