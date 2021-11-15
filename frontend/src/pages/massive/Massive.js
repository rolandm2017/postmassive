import React, { useHistory } from "react";

import Wrapper from "../_pageHelper/Wrapper";

// TODO: make each Massiv have a custom URL based on Poster Username + MassivID

function Massive(props) {
    const history = useHistory();
    const { _id } = props.match.params;

    return (
        <Wrapper
            pageName="massive"
            sectionName="massive_viewer"
            onSearchPage={false}
            onMessagePgae={false}
            breakpoints={props.breakpoints}
        >
            <div></div>
        </Wrapper>
    );
}

export default Massive;
