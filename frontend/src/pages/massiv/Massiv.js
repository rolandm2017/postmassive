import React from "react";

import Wrapper from "../helper/Wrapper";

// TODO: make each Massiv have a custom URL based on Poster Username + MassivID

function Massiv(props) {
    return (
        <Wrapper
            pageName="massiv"
            sectionName="massiv_viewer"
            onSearchPage={false}
            onMessagePgae={false}
            breakpoints={props.breakpoints}
        >
            <div>foo</div>
        </Wrapper>
    );
}

export default Massiv;
