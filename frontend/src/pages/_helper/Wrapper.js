import React, { Fragment, useState, useEffect } from "react";

import { useAuth, userValue } from "../../auth/use-auth";

import MobileTopBar from "../../components/mobileBars/MobileTopBar";
import MobileBottomBar from "../../components/mobileBars/MobileBottomBar";
import Sidebar from "../../components/sidebar/sidebar/Sidebar";
import Rightbar from "../../components/sidebar/rightSidebar/Rightbar";
import MessageAside from "../../components/messageAside/MessageAside";

import "./Wrapper.scss";
import "../../components/sidebar/SidebarCommon.scss";

function Wrapper(props) {
    const auth = useAuth();

    const [width, setWidth] = useState(window.innerWidth);

    const user = userValue();
    // console.log("wrapper props", props, user);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const shrinkSidebar = width < 1280;
    const keepRightbar = width >= 1005;

    return (
        <article
            id={props.pageName}
            className="main-container background-blue d-flex"
        >
            <Sidebar shrink={shrinkSidebar} auth={auth} user={user} />
            <MobileTopBar path={window.location.pathname} />
            <Fragment>
                <section
                    id={props.sectionName}
                    className="center-page background-blue mobile_bar-spacer"
                >
                    {props.children}
                </section>
            </Fragment>

            <MobileBottomBar />
            {props.onMessagePage ? (
                <MessageAside />
            ) : (
                <Rightbar
                    pageIsWiderThan1005px={keepRightbar}
                    onSearchPage={props.onSearchPage}
                />
            )}
        </article>
    );
}

export default Wrapper;
