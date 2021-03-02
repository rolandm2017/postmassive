import React from "react";

import BootstrapButton from "react-bootstrap/Button";

// does this really need to use a Bootstrap btn? can it not be a simple html btn?

import "./Button.scss";

function Button(props) {
    if (props.blueBg) {
        if (props.thin) {
            return (
                <div>
                    <BootstrapButton
                        style={{ width: `${props.width}` }}
                        className="generic-btn blue-bg thin-btn"
                        onClick={props.onClick}
                    >
                        {props.text}
                    </BootstrapButton>
                </div>
            );
        } else {
            return (
                <div>
                    <BootstrapButton
                        style={{ width: `${props.width}` }}
                        className="generic-btn blue-bg"
                        onClick={props.onClick}
                    >
                        {props.text}
                    </BootstrapButton>
                </div>
            );
        }
    } else {
        if (props.thin) {
            return (
                <div>
                    <BootstrapButton
                        style={{ width: `${props.width}` }}
                        className="generic-btn clear-bg thin-btn"
                        onClick={props.onClick}
                    >
                        {props.text}
                    </BootstrapButton>
                </div>
            );
        } else {
            return (
                <div>
                    <BootstrapButton
                        style={{ width: `${props.width}` }}
                        className="generic-btn clear-bg"
                        onClick={props.onClick}
                    >
                        {props.text}
                    </BootstrapButton>
                </div>
            );
        }
    }
}

export default Button;
