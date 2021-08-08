import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../auth/use-auth";

import SidebarButton from "../../parts/SidebarButton";
import PostButton from "../../parts/PostButton";
import SidebarProfile from "../../parts/SidebarProfile";
// import Modal from "react-bootstrap/Modal";

import Logo from "../../../images/gps-searching.png";

import Home from "../../../images/home-wh.png";
import Explore from "../../../images/search-64-wh.png";
import Notifications from "../../../images/notification-24-wh.png";
import Messages from "../../../images/messages-24-wh.png";
// import Bookmarks from "../../../images/bookmarks-32-wh.png";
import Profile from "../../../images/user-24-wh.png";
import More from "../../../images/more-48-wh.png";

import "./Sidebar.scss";

function Sidebar(props) {
    const [showModal, setShowModal] = useState(false);

    const auth = useAuth();
    const history = useHistory();

    // console.log(props);

    return (
        <aside id="sidebar">
            <div
                id="sidebar_container"
                className="d-flex flex-column align-items-end"
            >
                <div id="sidebar_btn-container">
                    <div id="sidebar_logo" className="sidebar_width-mgmt">
                        <img src={Logo} alt="logo" width="40px"></img>
                    </div>
                    <div id="sidebar_btns-wide" className="sidebar_width-mgmt">
                        {/* // TODO IMPORTANT: if viewer is nonAuth, display only Explore and Settings in sidebar. */}
                        <SidebarButton
                            src={Home}
                            alt="Home"
                            text="Home"
                            onClick={() => history.push("/home")}
                        />
                        <SidebarButton
                            src={Explore}
                            alt="Explore"
                            text="Explore"
                            onClick={() => history.push("/explore")}
                        />
                        <SidebarButton
                            src={Notifications}
                            alt="Notifications"
                            text="Notifications"
                            onClick={() => history.push("/notifications")}
                        />
                        <SidebarButton
                            src={Messages}
                            alt="Messages"
                            text="Messages"
                            onClick={() => history.push("/messages")}
                        />
                        {/* <SidebarButton
                            src={Bookmarks}
                            alt="Bookmarks"
                            text="Bookmarks"
                            onClick={() => history.push("/bookmarks")}
                        /> */}
                        <SidebarButton
                            src={Profile}
                            alt="Profile"
                            text="Profile"
                            onClick={() =>
                                history.push("/" + props.user.username)
                            }
                            // state={ prevPath: window.location.pathname }
                        />
                        <SidebarButton src={More} alt="More" text="More" />
                    </div>
                    <PostButton mini={props.shrink} />
                </div>
                <div
                    id="sidebar_spacer-container"
                    className="d-flex align-items-end"
                >
                    <div id="sidebar_profile-container" className="mx-2 my-4">
                        {showModal ? (
                            <div className="sidebar_modal-content d-flex justify-content-between align-items-center ">
                                <div
                                    className="sidebar_logout-text ml-2 my-0 p-3"
                                    onClick={() => {
                                        auth.signOut({
                                            pathname: "/",
                                        });
                                    }}
                                >
                                    <p className="m-0">Log out</p>
                                </div>
                                <div className="sidebar_close-container p-3">
                                    <span
                                        className="sidebar_close"
                                        onClick={() => setShowModal(false)}
                                    >
                                        &times;
                                    </span>
                                </div>
                            </div>
                        ) : null}
                        {props.user !== null ? (
                            <SidebarProfile
                                displayName={props.user.username}
                                username={props.user.username}
                                profilePic={Logo}
                                clicked={() => {
                                    setShowModal(true);
                                }}
                            />
                        ) : null}
                        {/* TODO: the above "null" could be a Log In prompt... */}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;

// FIXME: Messages icon is slightly too big
