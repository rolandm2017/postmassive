import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getOptions } from "../../_helper/authHeader";
import Button from "../../components/parts/Button";
import Massive from "../../components/massive/Massive";

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
class Profile extends Component {
    state = {
        profile: null,
        massives: null,
        showUpdateProfileModal: false,
    };

    componentDidMount() {
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
                    const displayNameNeedsToBeChosen = !!profile.displayName;
                    const bioNeedsTobeChosen = !!profile.bio;
                    console.log(profile.bio, profile.displayName);
                    if (displayNameNeedsToBeChosen || bioNeedsTobeChosen) {
                        // push popUpState = true
                        this.setState({ showUpdateProfileModal: true });
                    }
                    console.log(profile, 49);
                    this.setState({ profile: profile });
                })
                .catch((err) => {
                    console.log("????", err);
                });
        });
        // TODO IMPORTANT: upgrade fetching "/feed" to fetching the user's actual massives. (as in "/feed/:username")
        const userSpecificFeedUrl =
            process.env.REACT_APP_API_URL + "/feed/" + username;
        fetch(userSpecificFeedUrl, getOptions(userSpecificFeedUrl)).then(
            (res) => {
                res.json()
                    .then((massives) => {
                        console.log(50, "setting massives", massives);
                        this.setState({ massives: massives });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        );
    }

    convertToThreeDigits(integer) {
        const string = integer.toString();
        if (integer < 1000) {
            // e.g. 999
            return integer;
        } else if (integer >= 1000 && integer < 10000) {
            // e.g. 1,000 to 9,999
            return string[0] + "," + string.slice(1);
        } else if (integer >= 10000 && integer < 100000) {
            // 10.0k to 99.9k
            return string.slice(0, 2) + "." + string[2] + "k";
        } else if (integer >= 100000 && integer < 1000000) {
            // 100.0k to 999.9k
            return string.slice(0, 3) + "." + string[3] + "k";
        } else if (integer >= 10000000) {
            // 10.0M to 99.9M (even Trump doesn't exceed 99.9M on Twitter)
            return string.slice(0, 2) + "." + string[2] + "M";
        } else {
            // 1.0M to 9.99M
            return string[0] + "." + string.slice(1, 3) + "M";
        }
    }

    handleClose() {
        this.setState({ showUpdateProfileModal: false });
    }

    handleSave(displayName, bio, location, url) {
        console.log(this.state.profile, 101);
        // const profile = {props.username, }
        // this.setState({ profile: profile });
        // this.setState({ showUpdateProfileModal: false });
    }

    render() {
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
                        <a href={this.state.profile.website}>{site}</a>
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
                breakpoints={this.props.breakpoints}
            >
                {this.state.showUpdateProfileModal ? (
                    <UpdateProfileModal
                        showPage={this.state.showUpdateProfileModal}
                        // username={this.props.username}
                        // displayName={this.state.profile.displayName}
                        // bio={this.state.profile.bio}
                        // location={this.state.profile.location}
                        // url={this.state.profile.url}
                        handleClose={this.handleClose}
                    />
                ) : null}

                <div
                    className={`${styles.profileGenericFlex} ${styles.changeHeaderToMobileView}`}
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
                            {this.state.profile
                                ? this.state.profile.displayName
                                : null}
                        </h2>
                        <h3 id={`${styles.totalMassivs}`}>
                            {this.state.profile
                                ? `${this.state.profile.tweets} Massivs`
                                : null}
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
                                {this.state.profile
                                    ? this.state.profile.displayName
                                    : null}
                            </h2>
                            <h3 id={`${styles.totalMassivs}`}>
                                {this.state.profile
                                    ? `${this.state.profile.tweets} Massivs`
                                    : null}
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
                        <div
                            id={`${styles.interactionButtons}`}
                            className="d-flex"
                        >
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
                                    this.setState({
                                        showUpdateProfileModal: true,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className={`${styles.username} my-0`}>
                            {this.state.profile
                                ? this.state.profile.displayName
                                : null}
                        </h2>
                        <h3
                            className={`${styles.normalSizeFont} ${styles.greyText} ${styles.genericFontWeight} my-0`}
                        >
                            @
                            {this.state.profile
                                ? this.state.profile.username
                                : null}
                        </h3>
                    </div>
                    <div>
                        <h4
                            id={`${styles.biography}`}
                            className={`${styles.genericFontWeight} my-2`}
                        >
                            {this.state.profile ? this.state.profile.bio : null}
                        </h4>
                    </div>
                    <div id={`${styles.details}`} className="">
                        <div className="d-flex flex-row">
                            {this.state.profile
                                ? displayWebsite(this.state.profile.url)
                                : null}
                            {this.state.profile
                                ? displayLocation(this.state.profile.location)
                                : null}
                        </div>
                        <div className="d-flex flex-row">
                            {this.state.profile
                                ? displayBirthday(this.state.profile.birthday)
                                : null}
                            {this.state.profile
                                ? displayJoinDate(this.state.profile.joinDate)
                                : null}
                        </div>
                    </div>
                    <div>
                        {this.state.profile ? (
                            <h4 className={`${styles.underlineCancel}`}>
                                <Link
                                    to={{
                                        pathname: `${this.state.profile.username}/following`,
                                    }}
                                >
                                    <span
                                        className={`${styles.boldText} ${styles.normalSizeFont}`}
                                    >
                                        {this.convertToThreeDigits(
                                            this.state.profile.following
                                        )}
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
                                        pathname: `${this.state.profile.username}/followers`,
                                    }}
                                >
                                    <span
                                        className={`${styles.boldText} ${styles.normalSizeFont}`}
                                    >
                                        {this.convertToThreeDigits(
                                            this.state.profile.followers
                                        )}
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
                    {this.state.massives !== null
                        ? this.state.massives.map((massive, index) => {
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
}

export default Profile;
