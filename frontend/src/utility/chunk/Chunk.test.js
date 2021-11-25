import { shallow } from "enzyme";

import Chunk from "./Chunk";

describe("<Chunk />", () => {
    it("renders with 'stylized' className always", () => {
        const wrapper = shallow(<Chunk />);
        expect(wrapper.find("stylized")).to.have.lengthOf(1);
    });
    it("accepts props to give it more classNames", () => {
        const green = "green";
        const wrapperGreen = shallow(<Chunk availableStylings={green} />);
        expect(wrapperGreen.find(green)).to.have.lengthOf(1);
        const bold = "bold";
        const wrapperBold = shallow(<Chunk availableStylings={bold} />);
        expect(wrapperBold.find(bold)).to.have.lengthOf(1);
        const fontSize22 = "fontSize22";
        const wrapperFS22 = shallow(<Chunk availableStylings={fontSize22} />);
        expect(wrapperFS22.find(fontSize22)).to.have.lengthOf(1);
    });
});
