import { shallow } from "enzyme";

import ToBeStyled from "./ToBeStyled";

describe("<ToBeStyled />", () => {
    it("renders with 'stylized' className always", () => {
        const wrapper = shallow(<ToBeStyled />);
        expect(wrapper.find("stylized")).to.have.lengthOf(1);
    });
    it("accepts props to give it more classNames", () => {
        const green = "green";
        const wrapper = shallow(<ToBeStyled availableStylings={green} />);
        expect(wrapper.find(green)).to.have.lengthOf(1);
        const bold = "bold";
        const wrapper = shallow(<ToBeStyled availableStylings={bold} />);
        expect(wrapper.find(bold)).to.have.lengthOf(1);
        const fontSize22 = "fontSize22";
        const wrapper = shallow(<ToBeStyled availableStylings={fontSize22} />);
        expect(wrapper.find(fontSize22)).to.have.lengthOf(1);
    });
});
