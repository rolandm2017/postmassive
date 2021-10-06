import React from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../../../auth/use-auth";

import "./Menu.css";

function Menu(props) {
    const auth = useAuth();
    var visibility = "hide";

    if (props.menuVisibility) {
        visibility = "show";
    }

    return (
        <div
            id="flyoutMenu"
            onMouseDown={props.handleMouseDown}
            className={visibility}
        >
            <h2>
                <Link to="/">Home</Link>
            </h2>
            <h2>
                <Link to="/explore">Explore</Link>
            </h2>
            <h2>
                <Link to="/notifications">Notifications</Link>
            </h2>
            <h2>
                <Link to="/messages">Inbox</Link>
            </h2>
            <h2>
                <Link to="/marle">Profile</Link>
            </h2>
            <h2>
                <Link to="/post">Post</Link>
            </h2>
            <h2>
                <span
                    style={{ marginLeft: "15px" }}
                    onClick={() => {
                        auth.signOut({
                            pathname: "/",
                        });
                    }}
                >
                    Log out
                </span>
            </h2>
        </div>
    );
}

export default Menu;
