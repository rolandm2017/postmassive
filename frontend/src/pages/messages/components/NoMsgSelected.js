import React from "react";

import Button from "../../../components/parts/Button";

import "../Messages.scss";

function NoMsgSelected(props) {
    return (
        <div id="chat-display-inner-container">
            {" "}
            <h2>You don't have a message selected</h2>
            <p>Choose from your existing messages, or start a new one.</p>
            <Button
                text={"New message"}
                blueBg={false}
                authed={true}
                onClick={() => {
                    console.log("a");
                    props.setSelectedMsg();
                }}
            ></Button>
        </div>
    );
}

export default NoMsgSelected;
