import React from "react";

import Wrapper from "../helper/Wrapper";

// TODO: make each Massiv have a custom URL based on Poster Username + MassivID

function Massive(props) {
    return (
        <Wrapper
            pageName="massive"
            sectionName="massive_viewer"
            onSearchPage={false}
            onMessagePgae={false}
            breakpoints={props.breakpoints}
        >
            <div>foo</div>
        </Wrapper>
    );
}

export default Massive;
