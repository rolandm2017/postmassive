import React from "react";

import Button from "../../parts/Button";

import PopularMassive from "../../events/PopularMassive";
import FollowRec from "../../events/FollowRec";
import RelevantPerson from "../../events/RelevantPerson";
import NewsStory from "../../events/NewsStory";
import Trending from "../../events/Trending";

import "./Rightbar.scss";

function Rightbar(props) {
    function outputSearchBar(onSearchPage) {
        if (onSearchPage) return null;

        return (
            <div id="rightbar_search-container" className="mb-3">
                <input placeholder="Search Postmassive"></input>
            </div>
        );
    }

    // *****************
    // this is NOT zombie code. It is useful for later. I am simply disabling it to avoid a warning.
    // *****************
    // function outputRelevantPeople(onSearchPage) {
    //     if (onSearchPage) return null;

    //     return (
    //         <div id="rightbar_relevant-people" className="rounded-border mb-3">
    //             <h2 className="rightbar_headline my-2 ml-3">Relevant people</h2>
    //             <RelevantPerson
    //                 username="LincolnVoter"
    //                 displayName="Just Another Ex-Republican Biden Voter"
    //                 bio="One more Ex republican. I am not alone.This account helps @joebiden supporters trend. It also snarks Joe's opposition with a moderate's perspective."
    //                 followsYou={true}
    //             />
    //             <RelevantPerson
    //                 username="RationalMale"
    //                 displayName="Rollo Tomassi"
    //                 bio="#1 Bestselling author of The Rational Male book series https://amazon.com/Rollo-Tomassi/e/B00J2165RA"
    //                 followsYou={false}
    //             />
    //         </div>
    //     );
    // }
    // *****************
    // this is NOT zombie code.
    // *****************

    function outputWhatsHappening(onSearchPage) {
        if (onSearchPage) return null;

        return (
            <div id="rightbar_popular-massives" className="rounded-border mb-3">
                <h2 className="rightbar_headline my-2 ml-3">
                    What's happening
                </h2>
                <PopularMassive
                    headline="Placeholder - this morning"
                    content="Ipsum pariatur minim consectetur irure excepteur nostrud
                        occaecat exercitation do duis."
                    statistic={{ amount: null, type: null }}
                />
                <NewsStory
                    headline="Some Headline"
                    time="1 hour ago"
                    content="China and Covid-19: what went wrong in Wuhan?"
                />
                <Trending
                    headline="Politics"
                    content="Voluptate veniam mollit"
                    statistic={{ amount: 306040, type: "Amplifies" }}
                />
                <Trending
                    headline="Canadian News - LIVE"
                    content="Enim aliqua sint"
                    statistic={{ amount: 65903000, type: "Likes" }}
                />
                <div className="rightbar_rounded my-2 pl-2 pt-2">
                    <Button
                        text="Show more"
                        blueBg={false}
                        thin={false}
                        authed={true}
                    />
                </div>
            </div>
        );
    }

    return (
        <aside id="rightbar">
            <div id="rightbar_main" className="ml-4 mr-2 mt-2">
                {outputSearchBar(props.onSearchPage)}

                {/* {outputRelevantPeople(props.onSearchPage)} */}

                {outputWhatsHappening(props.onSearchPage)}

                <div id="rightbar_follow-recs" className="rounded-border mb-3">
                    <h2 className="rightbar_headline my-2 ml-3">
                        Who to follow
                    </h2>
                    <FollowRec
                        displayName="Archon The Dyong"
                        username="ArchonOf"
                    />
                    <FollowRec displayName="Eddy" username="waronweakness" />
                    {/* #*#*#*#**#*#*# */}
                    {/* note: not a generic button */}
                    <div className="rightbar_rounded mb-2 pl-2 pt-2">
                        <Button
                            text="Show more"
                            blueBg={false}
                            thin={false}
                            authed={true}
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Rightbar;

// NOTE: disappears when screen is thinner than 700px thanks to a prop passed in from App.js.
