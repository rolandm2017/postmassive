import React, { Component } from "react";

import { Link } from "react-router-dom";

import Home from "../../images/home-wh.png";
import Explore from "../../images/search-64-wh.png";
import Notifications from "../../images/notification-24-wh.png";
import Messages from "../../images/messages-24-wh.png";

import "./MobileBottomBar.scss";

class MobileBottomBar extends Component {
    render() {
        return (
            <div
                id="mobile_bottom-bar"
                className="show-when-thin mobile-width-control"
            >
                <div
                    id="mobile_bottom-bar-container"
                    className="d-flex align-items-center text-center"
                >
                    <Link to="/" className="img-container">
                        <img src={Home} alt="Home" className="img-sizing"></img>
                    </Link>
                    <Link to="/search" className="img-container">
                        <img
                            src={Explore}
                            alt="Search"
                            className="img-sizing"
                        ></img>
                    </Link>
                    <Link to="/notifications" className="img-container">
                        <img
                            src={Notifications}
                            alt="Notifications"
                            className="img-sizing"
                        ></img>
                    </Link>
                    <Link to="/inbox" className="img-container">
                        <img
                            src={Messages}
                            alt="Messages"
                            className="img-sizing"
                        ></img>
                    </Link>
                </div>
            </div>
        );
    }
}

export default MobileBottomBar;
