// doubles as the page for "Following"
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

// import { userValue } from "../../auth/use-auth";

import Wrapper from "../helper/Wrapper";

import BackButton from "../../images/icons8-back-arrow-48-wh.png";
import Nicolai from "../../images/markZuckerberg.jpeg";

import styles from "./Followers.module.scss";

function Following(props) {
    const history = useHistory();
    const userAndLocation = useLocation().pathname.split("/");

    // TODO: start the componentDidMount call to fetch a list of who this person follows.
    // for now it can be hardcoded in the frontend of the app.
    // later, get it from server.
    // TODO: like what twitter has, a "Followers", "following", "suggestions" tab
    // // TODO: load a list of people who follow me.
    // todo: console.log(followers, following || suggested based on button click)
    // TODO: if loggeed in, display "followers you know" for any profile that isn't the user's
    const [pageOwnerInfo, setPageOwnerInfo] = useState(null);
    const [users, setUsers] = useState(null);

    // does it matter at all if I go to the server and request the user's ENTIRE profile data,
    // or do i want to just retrieve their displayName? its a difference of a few bytes... at the cost of
    // writing an entirely new route on the server...

    console.log("aaaaaaaa", userAndLocation);
    useEffect(() => {
        fetchPageOwnerDisplayName();
        fetchUsers(userAndLocation[1], userAndLocation[2]);
    }, [fetchPageOwnerDisplayName, userAndLocation]);

    function fetchPageOwnerDisplayName() {
        const profileUrl =
            process.env.REACT_APP_API_URL + "/profile/" + userAndLocation[1];
        console.log(profileUrl);
        fetch(profileUrl).then((res) => {
            res.json().then((profile) => {
                console.log("setting profile", profile);
                setPageOwnerInfo(profile);
            });
        });
    }
    function fetchUsers(username, type) {
        // pretend fetch list of followers/following/suggested ... until a real dev server is avail
        console.log(username, type);
        const handleUsers = (response) => {
            response.json().then((users) => {
                console.log("mudkips", users);
                setUsers(users);
            });
        };
        let pathModifier;
        if (type === "followers") {
            pathModifier = "/followers/";
        } else if (type === "following") {
            pathModifier = "/following/";
        } else if (type === "suggested") {
            pathModifier = "/suggested/";
        } else {
            throw new Error("Incorrect input for fetchUsers function.");
        }
        fetch(process.env.REACT_APP_API_URL + pathModifier + username)
            .then(handleUsers)
            .catch((err) => {
                console.log(err);
            });
    }

    const loadFollowers = () => {
        // change to /followers
        // console.log(userAndLocation);
        const url = userAndLocation[1] + "/followers";
        console.log("A: going to", url);
        history.push(url);
    };

    const loadFollowing = () => {
        // change to /following
        // console.log(userAndLocation);
        // const url = userAndLocation[1] + "/following";
        const url = "/following";
        console.log("B: GOING TO", url);
        history.push(url);
    };

    const loadSuggested = () => {
        // change to /suggested
        // console.log(userAndLocation);
        const url = userAndLocation[1] + "/suggested";
        console.log("C: going to", url);
        history.push(url);
    };

    return (
        <Wrapper
            pageName="followers"
            sectionName="followers_main"
            onSearchPage={false}
            breakpoints={props.breakpoints}
        >
            <div>
                <div className="d-flex">
                    <div
                        id={`${styles.backButtonContainer}`}
                        className="d-flex justify-content-center align-items-center"
                    >
                        <img
                            id={`${styles.backButton}`}
                            src={BackButton}
                            alt="go back"
                        ></img>
                    </div>
                    <div
                        id={`${styles.headline}`}
                        className="d-flex justify-content-center flex-column"
                    >
                        {pageOwnerInfo ? (
                            <div>
                                <h2 className="bold-big my-1">
                                    {pageOwnerInfo.displayName}
                                </h2>
                                <h3 className="tiny-grey">
                                    @{pageOwnerInfo.username}
                                </h3>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div
                id={`${styles.options}`}
                className="d-flex justify-content-around"
            >
                <div onClick={loadFollowers}>
                    <p>Followers</p>
                </div>
                <div onClick={loadFollowing}>
                    <p>Following</p>
                </div>
                <div onClick={loadSuggested}>
                    <p>Suggested</p>
                </div>
                {/* // TODO: change these options based on user state and whos profile is being looked at */}
                {/* // if looking @ ur own profile, see:
                followers,following,suggested // if looking @ someone else's pf,
                see: followers you know,followers,following */}
            </div>
            <div id="list-of-users">
                {users
                    ? users.map((user, index) => (
                          <div
                              key={index}
                              className={`${styles.followerCard} d-flex`}
                          >
                              <div className="d-flex justify-center align-items-center">
                                  <img
                                      src={Nicolai}
                                      alt="placeholder profile pic"
                                  ></img>
                              </div>
                              <div className={`${styles.flexOne} pt-2 pl-2`}>
                                  <h3 className="bold-white">
                                      {user.displayName}
                                  </h3>
                                  <h4 className="standard-grey">
                                      @{user.username}
                                  </h4>
                                  <p className="standard-white">{user.bio}</p>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </Wrapper>
    );
}

export default Following;
