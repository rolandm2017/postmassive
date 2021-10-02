import React from "react";

import Button from "../../../components/parts/Button";

import "./Display.css";

function Display(props) {
    return (
        <div id="landing_static-display">
            <div id="display_prompt">
                <h3 className="darkmode-text header-text-large">
                    Hear the world's loudest social media.
                </h3>
            </div>
            <div id="display_join">
                <h5 className="darkmode-text header-subtitle-text">
                    Join PostMassive today.
                </h5>
            </div>
            <div id="landing_buttons">
                {/* // FIXME: buttons need space between them again */}
                <div className="d-flex mt-4 mobile-desktop-spacing-adjust justify-content-between">
                    <div className="uxui-landing-btn-width-mod mr-3">
                        <Button
                            text="Sign Up"
                            blueBg={true}
                            onClick={props.handleShow}
                        ></Button>
                    </div>
                    <div className="uxui-landing-btn-width-mod">
                        <Button
                            text="Log In"
                            blueBg={false}
                            onClick={props.handleLogIn}
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Display;
