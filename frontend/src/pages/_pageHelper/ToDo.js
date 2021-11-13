import React from "react";

import { useHistory } from "react-router-dom";

import Button from "../../components/parts/Button";
import Wrapper from "./Wrapper";

function ToDo(props) {
    const history = useHistory();

    return (
        <Wrapper
            pageName="messages"
            sectionName="messages_page"
            onSearchPage={false}
            breakpoints={props.breakpoints}
            onMessagePage={true}
        >
            <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100 ">
                <h1>TODO: fill in this page :- ) </h1>
                <p>Doesn't look like part of a Portfolio MVP to me...</p>
                <div>
                    <Button text="Go back" onClick={history.goBack}>
                        Go back
                    </Button>
                </div>
            </div>
        </Wrapper>
    );
}

export default ToDo;
