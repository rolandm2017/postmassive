import React from "react";

import BootstrapButton from "react-bootstrap/Button";

// does this really need to use a Bootstrap btn? can it not be a simple html btn?

import "./Button.scss";

function Button(props) {
    let usedClasses = "generic-btn";
    if (props.blueBg) {
        usedClasses = usedClasses + " blue-bg";
    } else {
        usedClasses = usedClasses + " clear-bg";
    }
    if (props.thin) {
        usedClasses = usedClasses + " thin-btn";
    }
    if (props.authed) {
        usedClasses = usedClasses + " authed-btn";
    }
    if (props.wide) {
        usedClasses = usedClasses + " wide-btn";
    }

    return (
        <div>
            <BootstrapButton
                style={{ width: `${props.width}` }}
                className={usedClasses}
                onClick={props.onClick}
            >
                {props.text}
            </BootstrapButton>
        </div>
    );
}

export default Button;
