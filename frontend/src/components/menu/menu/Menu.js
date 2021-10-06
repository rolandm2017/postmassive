import React from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../../../auth/use-auth";

import "./Menu.css";

function Menu() {
    const auth = useAuth();
    var visibility = "hide";

    if (this.props.menuVisibility) {
        visibility = "show";
    }

    return (
        <div
            id="flyoutMenu"
            onMouseDown={this.props.handleMouseDown}
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
                <a href="/profile">Profile</a>
            </h2>
            <h2>
                <Link to="/post">Post</Link>
            </h2>
            <h2>
                <span
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
