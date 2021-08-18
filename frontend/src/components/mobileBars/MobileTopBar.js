import React from "react";

import MenuContainer from "../menu/MenuContainer";

import Star from "../../images/star.png";

import "./MobileTopBar.scss";

function MobileTopBar(props) {
    function customizeBar(path) {
        if (path === "/") {
            return "Home";
        } else if (path === "/search") {
            return ""; // because it will be filled by an actual search input
        } else if (path === "/notifications") {
            return "Notifications";
        } else if (path === "/messages") {
            return "Messages";
        } else if (path === "/post") {
            return "Post";
        }
        // else {
        //     throw Error("path does not exist");
        // }
    }

    function loadSearchBar(path) {
        if (path === "/search") {
            return (
                <div
                    id="search_bar-container-mobile"
                    className="d-flex justify-content-center align-items-center"
                >
                    <input
                        className="my-1 mx-3"
                        type="text"
                        name="search-bar"
                        id="search-bar"
                        placeholder="Search PostMassive"
                    ></input>
                    {/* TODO: give the search input a nice magnifying glass icon */}
                    {/* <Button text="Search"></Button> */}
                    {/* have the user press enter to search, or click on the (future) dropdown */}
                </div>
            );
        }
    }

    return (
        <div
            id="mobile_top-bar"
            className="show-when-thin mobile-width-control"
        >
            <MenuContainer />
            <h3>{customizeBar(props.path)}</h3>
            <div>{loadSearchBar(props.path)}</div>
            <div id="mobile_star-container">
                <img src={Star} alt="star" />
                {/* TODO-LATER: make this star container into a settings menu for organizing the timeline */}
                {/* TODO: display Star if on "/", settings gear on Notifications page, else null */}
            </div>
        </div>
    );
}

export default MobileTopBar;
