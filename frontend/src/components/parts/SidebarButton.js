import React from "react";

import "./SidebarButton.scss";

function SidebarButton(props) {
    return (
        <div className="m-0">
            <div
                className="sidebar_btn-container my-2 d-flex"
                onClick={props.onClick}
            >
                <div className="sidebar_btn-icon-parent mx-0 my-0">
                    <img
                        className="sidebar_btn-icon ml-2"
                        src={props.src}
                        alt={props.alt}
                    ></img>
                </div>
                <div className="sidebar_btn-text-parent d-flex align-items-center">
                    <span className="sidebar_btn-text">{props.text}</span>
                </div>
            </div>
        </div>
    );
}

export default SidebarButton;
