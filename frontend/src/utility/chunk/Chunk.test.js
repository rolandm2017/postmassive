import { shallow } from "enzyme";

import Chunk from "./Chunk";

describe("<Chunk />", () => {
    it("renders with 'stylized' className always", () => {
        const wrapper = shallow(<Chunk />);
        expect(wrapper.find("stylized")).to.have.lengthOf(1);
    });
    it("accepts props to give it more classNames", () => {
        const green = "green";
        const wrapper = shallow(<Chunk availableStylings={green} />);
        expect(wrapper.find(green)).to.have.lengthOf(1);
        const bold = "bold";
        const wrapper = shallow(<Chunk availableStylings={bold} />);
        expect(wrapper.find(bold)).to.have.lengthOf(1);
        const fontSize22 = "fontSize22";
        const wrapper = shallow(<Chunk availableStylings={fontSize22} />);
        expect(wrapper.find(fontSize22)).to.have.lengthOf(1);
    });
});
