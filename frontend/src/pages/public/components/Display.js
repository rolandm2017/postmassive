import React from "react";

import Button from "../../../components/parts/Button";

import Logo from "../../../images/gps-searching.png";

import "./Display.css";

function Display(props) {
    return (
        <div id="landing_static-display">
            <div id="display_logo">
                <div>
                    <img src={Logo} />
                </div>
                <div className="flex-centering">
                    <p>2021 Postmassive Inc.</p>
                </div>
            </div>
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
                <div className="generic-flex mobile-desktop-spacing-adjust">
                    <div className="uxui-landing-btn-width-mod">
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
