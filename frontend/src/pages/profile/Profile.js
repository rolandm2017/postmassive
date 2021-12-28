import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOptions } from "../../_helper/authHeader";
import Button from "../../components/parts/Button";
import Massive from "../../components/massiveComponent/MassiveComponent";
import {
    convertToThreeDigits,
    updateProfileAPI,
} from "./components/UpdateProfileLogic";

import UpdateProfileModal from "./components/UpdateProfileModal";
import Wrapper from "../_pageHelper/Wrapper";

import BackButton from "../../images/icons8-back-arrow-48-wh.png";
import More from "../../images/important-mail-48.png";
import Mail from "../../images/ellipsis-50.png";
import Bell from "../../images/bell-48.png";
import Nicolai from "../../images/markZuckerberg.jpeg";

import styles from "./Profile.module.scss";

// TODO: go thru this page and replace all fonts stylings with fonts from app.scss. Remove profile.module.scss usage where possible

// thank Nico for his work
function Profile(props) {
    const [profile, setProfile] = useState(null);
    const [massives, setMassives] = useState(null);
    const [showUpdateProfile, setShowUpdateProfile] = useState(null);

    useEffect(() => {
        let username = window.location.pathname.slice(1);
        const profileUrl =
            process.env.REACT_APP_API_URL + "/profile/get?username=" + username;
        console.log(29, username, profileUrl);
        console.log(profileUrl);
        // fixme-now: get profile bio...
        fetch(profileUrl).then((res) => {
            console.log("profile was fetched");
            res.json()
                .then((profile) => {
                    console.log("setting profile,", profile);
                    // make popup if profile isn't filled in yet
                    const displayNameNeedsToBeChosen =
                        profile.displayName.length > 0;
                    const bioNeedsTobeChosen = profile.bio.length > 0;
                    console.log(profile.bio, profile.displayName);
                    if (displayNameNeedsToBeChosen || bioNeedsTobeChosen) {
                        // push popUpState = true
                        setShowUpdateProfile(true);
                    }
                    console.log(profile, 49);
                    setProfile(profile);
                })
                .catch((err) => {
                    console.log("????", err);
                });
        });
        // TODO IMPORTANT: upgrade fetching "/feed" to fetching the user's actual massives. (as in "/feed/:username")
        // TODO
        const userSpecificFeedUrl =
            process.env.REACT_APP_API_URL + "/feed/" + username;
        fetch(userSpecificFeedUrl, getOptions(userSpecificFeedUrl)).then(
            (res) => {
                res.json()
                    .then((massives) => {
                        console.log(50, "setting massives", massives);
                        setMassives({ massives: massives });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        );
    }, []);

    function handleClose() {
        setShowUpdateProfile(false);
    }

    function handleSave(username, displayName, bio, location, url) {
        console.log(profile, 101);
        updateProfileAPI(username, displayName, bio, location, url);
        const copyProfile = { ...profile };
        copyProfile.displayName = displayName;
        copyProfile.bio = bio;
        copyProfile.location = location;
        copyProfile.url = url;
        console.log(copyProfile, 88);
        setProfile(copyProfile);
        setShowUpdateProfile(false);
    }

    const displayLocation = (loc) =>
        loc ? (
            <div>
                <span
                    className={`${styles.greyText} ${styles.genericFontWeight}`}
                >
                    {loc}
                </span>
            </div>
        ) : null;
    const displayWebsite = (site) =>
        site ? (
            <div>
                <span
                    className={`${styles.link} ${styles.genericFontWeight} ${styles.underlineCancel}`}
                >
                    <a href={profile.website}>{site}</a>
                </span>
            </div>
        ) : null;
    const displayBirthday = (birthday) =>
        birthday ? (
            <div>
                <span
                    className={`${styles.greyText} ${styles.genericFontWeight}`}
                >
                    Born {birthday}
                </span>
            </div>
        ) : null;
    const displayJoinDate = (joinDate) =>
        joinDate ? (
            <div>
                <span
                    className={`${styles.greyText} ${styles.genericFontWeight}`}
                >
                    Joined {joinDate}
                </span>
            </div>
        ) : null;

    return (
        <Wrapper
            pageName="profile"
            sectionName="profile_page"
            onSearchPage={false}
            breakpoints={props.breakpoints}
        >
            {profile !== null ? (
                <UpdateProfileModal
                    showPage={showUpdateProfile}
                    username={props.username}
                    displayName={profile.displayName}
                    bio={profile.bio}
                    location={profile.location}
                    url={profile.url}
                    handleClose={handleClose}
                    handleSave={handleSave}
                />
            ) : null}

            <div
                className={`${styles.profileGenericFlex} ${styles.changeHeaderToMobileView}`}
            >
                <div
                    onClick={() => {
                        console.log("btn isn't set up to push /home, go do it");
                        // history.push("/home");
                        // todo: push previous url to stack
                    }}
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
                    <h2 className={`${styles.username} my-1`}>
                        {profile ? profile.displayName : null}
                    </h2>
                    <h3 id={`${styles.totalMassivs}`}>
                        {profile ? `${profile.tweets} Massivs` : null}
                    </h3>
                </div>
            </div>
            <div id={`${styles.coverPhoto}`}>
                <div
                    className={`${styles.profileGenericFlex} ${styles.showHeaderDuringMobile}`}
                >
                    <div
                        onClick={() => {
                            console.log(
                                "btn isn't set up to push /home, go do it"
                            );
                            // history.push("/home");
                            // todo: push previous url to stack
                        }}
                        id={`${styles.backButtonContainer}`}
                        className={`d-flex justify-content-center align-items-center ${styles.pfpSideBox}`}
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
                        <h2 className={`${styles.username} my-1`}>
                            {profile ? profile.displayName : null}
                        </h2>
                        <h3 id={`${styles.totalMassivs}`}>
                            {profile ? `${profile.tweets} Massivs` : null}
                        </h3>
                    </div>
                    <div className={`${styles.pfpSideBox}`}>
                        {/* // filler */}
                    </div>
                </div>
            </div>
            <header id={`${styles.profileInfo}`} className="px-3 pt-2">
                <div id={`${styles.picAndOptions}`} className="d-flex">
                    <div id={`${styles.profilePicContainer}`}>
                        <img
                            id={`${styles.profilePic}`}
                            src={Nicolai}
                            alt="an avatar"
                        ></img>
                    </div>
                    <div id={`${styles.interactionButtons}`} className="d-flex">
                        <div className={`${styles.hideOnSml}`}>
                            <button
                                className={`${styles.interactionButton} bg-blue-highlight`}
                            >
                                <img
                                    className={`${styles.interactionImg}`}
                                    src={More}
                                    alt="More options"
                                ></img>
                            </button>
                            <button
                                className={`${styles.interactionButton} bg-blue-highlight`}
                            >
                                <img
                                    className={`${styles.interactionImg}`}
                                    src={Mail}
                                    alt="Send mail"
                                ></img>
                            </button>
                            <button
                                className={`${styles.interactionButton} bg-blue-highlight`}
                            >
                                <img
                                    className={`${styles.interactionImg}`}
                                    src={Bell}
                                    alt="Notification options"
                                ></img>
                            </button>
                        </div>
                        {/* </div> */}
                        {/* <div className="d-flex justify-content-center align-items-center"> */}
                        <Button
                            text="Edit Profile"
                            authed={true}
                            wide={true}
                            onClick={() => {
                                console.log(294);

                                setShowUpdateProfile(true);
                            }}
                        />
                    </div>
                </div>
                <div>
                    <h2 className={`${styles.username} my-0`}>
                        {profile ? profile.displayName : null}
                    </h2>
                    <h3
                        className={`${styles.normalSizeFont} ${styles.greyText} ${styles.genericFontWeight} my-0`}
                    >
                        @{profile ? profile.username : null}
                    </h3>
                </div>
                <div>
                    <h4
                        id={`${styles.biography}`}
                        className={`${styles.genericFontWeight} my-2`}
                    >
                        {profile ? profile.bio : null}
                    </h4>
                </div>
                <div id={`${styles.details}`} className="">
                    <div className="d-flex flex-row">
                        {profile ? displayWebsite(profile.url) : null}
                        {profile ? displayLocation(profile.location) : null}
                    </div>
                    <div className="d-flex flex-row">
                        {profile ? displayBirthday(profile.birthday) : null}
                        {profile ? displayJoinDate(profile.joinDate) : null}
                    </div>
                </div>
                <div>
                    {profile ? (
                        <h4 className={`${styles.underlineCancel}`}>
                            <Link
                                to={{
                                    pathname: `${profile.username}/following`,
                                }}
                            >
                                <span
                                    className={`${styles.boldText} ${styles.normalSizeFont}`}
                                >
                                    {profile !== null
                                        ? profile.following > 0
                                            ? convertToThreeDigits(
                                                  profile.following
                                              )
                                            : null
                                        : null}
                                </span>
                                <span
                                    className={`${styles.lightText} ${styles.normalSizeFont} ${styles.genericFontWeight} ${styles.greyText}`}
                                >
                                    {" "}
                                    Following
                                </span>
                            </Link>
                            {"   "}
                            <Link
                                to={{
                                    pathname: `${profile.username}/followers`,
                                }}
                            >
                                <span
                                    className={`${styles.boldText} ${styles.normalSizeFont}`}
                                >
                                    {profile !== null
                                        ? profile.followers > 0
                                            ? convertToThreeDigits(
                                                  profile.followers
                                              )
                                            : null
                                        : null}
                                </span>
                                <span
                                    className={`${styles.lightText} ${styles.normalSizeFont} ${styles.genericFontWeight} ${styles.greyText}`}
                                >
                                    {" "}
                                    Followers
                                </span>
                            </Link>
                        </h4>
                    ) : null}
                </div>
            </header>
            <div id={`${styles.options}`} className="d-flex">
                <div>
                    <p>Massives</p>
                </div>
                <div>
                    <p>Massives & replies</p>
                </div>
                <div>
                    <p>Amplifies</p>
                </div>
                <div>
                    <p>Likes</p>
                </div>
            </div>
            <div id={`${styles.massivesContainer}`}>
                {massives !== null
                    ? massives.map((massive, index) => {
                          return (
                              <Massive
                                  key={index}
                                  author={massive.author.username}
                                  displayName={massive.author.displayName}
                                  content={massive.content}
                                  replies={massive.replies}
                                  amps={massive.amplifies}
                                  likes={massive.likes}
                                  views={massive.views}
                                  cap={massive.cap}
                              />
                          );
                      })
                    : null}
            </div>
        </Wrapper>
    );
}

export default Profile;
