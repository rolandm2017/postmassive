import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Wrapper from "./Wrapper";
import Sidebar from "../../components/sidebar/sidebar";

Enzyme.configure({ adapter: new Adapter() });

// todo: test wrapper with a static input for user value. make sure wrapper renders correctly.

// todo: it() loads sidebar profile when user is not nul

describe("SomeComponent component", () => {
    it("Shallow rendering", () => {
        const wrapper = shallow(<Wrapper {...props} />);
    });
});
